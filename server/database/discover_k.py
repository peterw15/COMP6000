import mysql.connector
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import seaborn as sns
from flask import Flask, jsonify, request
from sklearn.decomposition import PCA


# Flask web app for frontend
app = Flask(__name__)

# Database setup
db_setup = {
    'user': 'comp6000_09',
    'password': 'p3oulla',
    'host': 'dragon.kent.ac.uk',
    'database': 'comp6000_09',
}

#function to connect to db and check its working properly.
def connect_to_database():
    # Connecting to the database
    try:
        connection = mysql.connector.connect(**db_setup)
        print("Connected to MySQL server")
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

#function to fetch the data I need from the db
#in this case a query to selecrt user id, first name, last name, event id, tag as eventTags and interact with even reg
def fetch_data_from_db():
    # Creating a cursor and fetching data from the database
    try:
        connection = connect_to_database()
        if connection is not None:
            cursor = connection.cursor()
            query = """
                SELECT u.UserID, u.firstName, u.lastName, e.EventID, GROUP_CONCAT(t.tag) AS eventTags 
                FROM User u
                LEFT JOIN EventRegistration e ON u.UserID = e.UserID
                LEFT JOIN EventTags t ON e.EventID = t.EventID
                GROUP BY u.UserID, e.EventID
                """
            cursor.execute(query)
            rows = cursor.fetchall()
            return rows
    finally:
        if 'cursor' in locals():
            cursor.close()
        if connection and connection.is_connected():
            connection.close()
            
#function to prep the data for clustering just puts iti n a dataframe with rows and columns and binarizer it so its useable for data
#turns it into binary as i cant use words for clustering.
def prepare_and_cluster_data(rows):
    # DataFrame creation and data transformation
    df = pd.DataFrame(rows, columns=['UserID', 'firstName', 'lastName', 'EventID', 'eventTags'])
    df['eventTags'] = df['eventTags'].apply(lambda x: x.split(',') if x else [])
    mlb = MultiLabelBinarizer()
    event_tags_matrix = pd.DataFrame(mlb.fit_transform(df['eventTags']), columns=mlb.classes_)
    
    # K-Means clustering
    num_clusters = 3
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    df['Cluster'] = kmeans.fit_predict(event_tags_matrix)
    
    return df, event_tags_matrix, kmeans

#will recmmend an event for the user, filters through dataframe
def recommend_events_for_user(df, events, user_id):
    # Check if the user exists in the DataFrame
    if user_id not in df['UserID'].values:
        print(f"User ID {user_id} not found in the DataFrame.")
        return []
    
    # Attempt to find the cluster of the target user
    user_cluster_series = df.loc[df['UserID'] == user_id, 'Cluster']
    
    # If the user does not have a cluster assigned or was not found
    if user_cluster_series.empty:
        print(f"User ID {user_id} does not have a cluster assigned or was not found.")
        return []
    
    user_cluster = user_cluster_series.iloc[0]
    
    # Filter the DataFrame for users in the same cluster
    cluster_users = df[df['Cluster'] == user_cluster]
    
    # Aggregate tags of all users in the cluster
    all_tags = sum(cluster_users['eventTags'].tolist(), [])
    
    # Tags associated with the target user
    user_tags = df.loc[df['UserID'] == user_id, 'eventTags'].iloc[0]
    
    # Find events with tags that the target user hasn't registered for
    events_df = pd.DataFrame(events, columns=['EventID', 'EventName', 'eventTags'])
    events_df['eventTags'] = events_df['eventTags'].apply(lambda x: x.split(',') if x else [])
    recommended_events = events_df[events_df['eventTags'].apply(lambda tags: any(tag in all_tags and tag not in user_tags for tag in tags))]
    
    if recommended_events.empty:
        print(f"No new events to recommend for User ID {user_id}.")
    
    return recommended_events[['EventID', 'EventName']].to_dict('records')


def fetch_events_from_db():
    # Creating a cursor and fetching events from the database
    try:
        connection = connect_to_database()
        if connection is not None:
            cursor = connection.cursor()
            query = """
                SELECT e.EventID, e.EventName, GROUP_CONCAT(t.tag) AS eventTags
                FROM Event e
                LEFT JOIN EventTags t ON e.EventID = t.EventID
                GROUP BY e.EventID
                """
            cursor.execute(query)
            events = cursor.fetchall()
            return events
    finally:
        if 'cursor' in locals():
            cursor.close()
        if connection and connection.is_connected():
            connection.close()




def visualize_clusters_pca(df, event_tags_matrix, kmeans):
    # Reduce the dimensionality of the event tags matrix to 2 components for visualization
    pca = PCA(n_components=2)
    principalComponents = pca.fit_transform(event_tags_matrix)
    
    # Create a DataFrame with the principal components and cluster labels
    pca_df = pd.DataFrame(data=principalComponents, columns=['Principal Component 1', 'Principal Component 2'])
    pca_df['Cluster'] = df['Cluster'].values
    
    # Plotting the 2D projection 
    plt.figure(figsize=(10, 8))
    colors = ['r', 'g', 'b', 'y', 'c', 'm']
    for cluster in range(kmeans.n_clusters):
        cluster_subset = pca_df[pca_df['Cluster'] == cluster]
        plt.scatter(cluster_subset['Principal Component 1'], cluster_subset['Principal Component 2'], s=100, c=colors[cluster], label=f'Cluster {cluster}')
    
    plt.title('Clusters of Users Based on Event Tags (PCA-reduced)')
    plt.xlabel('Principal Component 1')
    plt.ylabel('Principal Component 2')
    plt.legend()
    plt.show()
    
    # Creating a heatmap to visualize the distances or similarities between clusters
    # Calculate the centroids of each cluster in the PCA-reduced space
    centroids = kmeans.cluster_centers_
    reduced_centroids = pca.transform(centroids)
    
    # Compute the pairwise distances between cluster centroids
    from scipy.spatial.distance import pdist, squareform
    distances = squareform(pdist(reduced_centroids, 'euclidean'))
    
    # Plotting the heatmap of distances
    plt.figure(figsize=(8, 6))
    sns.heatmap(distances, annot=True, fmt=".2f", cmap='viridis', xticklabels=[f'Cluster {i}' for i in range(kmeans.n_clusters)], yticklabels=[f'Cluster {i}' for i in range(kmeans.n_clusters)])
    plt.title('Heatmap of Distances Between Cluster Centroids')
    plt.show()

    
    
@app.route('/get-recommended-events/<int:user_id>', methods=['GET'])
def get_recommended_events(user_id):
    rows = fetch_data_from_db()
    events = fetch_events_from_db()
    if rows and events:
        df, event_tags_matrix, kmeans = prepare_and_cluster_data(rows)
        recommended_events = recommend_events_for_user(df, events, user_id)
        return jsonify(recommended_events)
    else:
        return jsonify([])

if __name__ == '__main__':
    rows = fetch_data_from_db()
    events = fetch_events_from_db()
    if rows and events:
        df, event_tags_matrix, kmeans = prepare_and_cluster_data(rows)
        user_ids = df['UserID'].unique()
        for user_id in user_ids:
            recommended_events = recommend_events_for_user(df, events, user_id)
            print(f"Recommended events for User ID {user_id}: {recommended_events}")
        
        # New visualization function call
        visualize_clusters_pca(df, event_tags_matrix, kmeans)
        app.run(debug=True)