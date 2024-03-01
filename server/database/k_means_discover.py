# all imports
import mysql.connector  # database connection
import pandas as pd  # data manipulation
from sklearn.preprocessing import MultiLabelBinarizer  #  binary encoding of tags
from sklearn.cluster import KMeans  # KMeans clustering
from flask import Flask, jsonify, request  # jsonify for JSON responses
import matplotlib.pyplot as plt  # visualization
import seaborn as sns  # heatmap visualization

# connecting to db
db_setup = {
    'user': 'comp6000_09',
    'password': 'p3oulla',
    'host': 'dragon.kent.ac.uk',
    'database': 'comp6000_09',
}

app = Flask(__name__)  # Flask web application

def recommend_events(user_id, cluster_label):
    # Recommend events for a given user and cluster
    query = f"""
            SELECT EventID, eventName
            FROM Event
            WHERE cluster_label = {cluster_label} AND EventID NOT IN (
                SELECT EventID
                FROM EventRegistration
                WHERE UserID = {user_id}
            )
            """
    cursor.execute(query)
    rows = cursor.fetchall()
    recommended_events = [{"EventID": row[0], "eventName": row[1]} for row in rows]
    return recommended_events

# for event recommendations
@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    user_id = data.get('user_id')  
    user_name = df[df['UserID'] == user_id][['firstName', 'lastName']].iloc[0]
    print(f"\nUser {user_id} ({user_name['firstName']} {user_name['lastName']}) - Recommendations:")
    recommended_events = recommend_events(user_id, None) 
    for event in recommended_events:
        print(f"EventID {event['EventID']} - EventName: {event['eventName']}")
    return jsonify(recommended_events)

# retrieving information about users
@app.route('/all_users', methods=['GET'])
def get_all_users():
    all_users_data = df[['UserID', 'firstName', 'lastName']].to_dict(orient='records')
    return jsonify(all_users_data)

try:
    # connecting to the db
    connection = mysql.connector.connect(**db_setup)
    print("Connected to MySQL server")

    # creating a cursor for database 
    cursor = connection.cursor()

    # database query to retrieve user and event data
    query = """
            SELECT u.UserID, u.firstName, u.lastName, e.EventID, GROUP_CONCAT(t.tag) AS eventTags 
            FROM User u
            LEFT JOIN EventRegistration e ON u.UserID = e.UserID
            LEFT JOIN EventTags t ON e.EventID = t.EventID
            GROUP BY u.UserID, e.EventID
            """

    cursor.execute(query)

    # Fetch all rows
    rows = cursor.fetchall()

    # DataFrame 
    df = pd.DataFrame(rows, columns=['UserID', 'firstName', 'lastName', 'EventID', 'eventTags'])

    # user data with event tags
    print("UserID | firstName | lastName | Event Tags")
    for _, user_row in df[['UserID', 'firstName', 'lastName', 'eventTags']].iterrows():
        user_tags = ", ".join(f"{tag}({1 if tag in user_row['eventTags'] else 0})" for tag in user_row['eventTags'].split(', '))
        print(f"{int(user_row['UserID'])} | {user_row['firstName']} | {user_row['lastName']} | {user_tags}")

    # Split the tags into a list
    df['eventTags'] = df['eventTags'].apply(lambda x: x.split(','))

    # turn tags into binary values
    mlb = MultiLabelBinarizer()
    event_tags_matrix = pd.DataFrame(mlb.fit_transform(df['eventTags']), columns=mlb.classes_)

    # Train the k-means model
    num_clusters = 3
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    kmeans.fit(event_tags_matrix)

    # Assign cluster labels to users
    df['Cluster'] = kmeans.labels_

    # user participation in events based on event tags and clusters
    plt.figure(figsize=(12, 8))
    sns.heatmap(event_tags_matrix.T, cmap='viridis', cbar=False)
    plt.title('User Participation in Events')
    plt.xlabel('UserID')
    plt.ylabel('Event Tags')

    # Plot clusters along with centroids
    plt.scatter(df.index, df['Cluster'], c=df['Cluster'], cmap='viridis', marker='x', s=100, linewidths=2)
    plt.scatter(kmeans.cluster_centers_[:, 0], range(num_clusters), c='red', marker='o', s=200, label='Centroids')
    plt.legend()
    plt.show()

    if __name__ == '__main__':
        app.run(debug=True) 

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    if 'cursor' in locals():
        cursor.close()
    if 'connection' in locals() and connection.is_connected():
        connection.close()
        print("Connection closed")
