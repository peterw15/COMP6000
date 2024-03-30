import mysql.connector
import json
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import MultiLabelBinarizer
import sys

# Database setup
database_setup = {
    'host': 'dragon.kent.ac.uk',
    'user': 'comp6000_09',
    'password': 'p3oulla',
    'database': 'comp6000_09'
}

def fetch_events():
    """
    Connect to the database and fetches events registrations.
    Returns a list of dictionaries with UserID and EventIDs for each user.
    """
    try:
        # Connect to the database
        connection = mysql.connector.connect(**database_setup)
        cursor = connection.cursor(dictionary=True)
        
        # Select user and all connected events through the EventRegistration table
        query = """
                SELECT 
                    er.UserID, 
                    GROUP_CONCAT(er.EventID) AS EventIDs
                FROM 
                    EventRegistration er
                GROUP BY 
                    er.UserID;
                """
        
        # Execute the query
        cursor.execute(query)
        events = cursor.fetchall()
        
        return events
    except mysql.connector.Error as error:
        print(f"Unable to reach database table: {error}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL Connection is now closed")

def recommend_events_for_user(signed_in_user_id):
    """
    Fetches events, runs KMeans clustering, and generates event recommendations
    for the signed-in user based on the clusters.
    """
    events = fetch_events()
    data = [
        {"UserID": user["UserID"], "EventIDs": list(map(int, user["EventIDs"].split(',')))}
        for user in events
    ]
    df = pd.DataFrame(data)

    # Ensure the signed-in user is in the dataset
    if signed_in_user_id not in df['UserID'].values:
        print("User has no event registrations.")
        return []

    mlb = MultiLabelBinarizer()
    events_binarized = mlb.fit_transform(df['EventIDs'])
    kmeans = KMeans(n_clusters=3, random_state=42)
    df['Cluster'] = kmeans.fit_predict(events_binarized)

    # Find the cluster the user belongs to and the events they have attended
    user_cluster = df.loc[df['UserID'] == signed_in_user_id, 'Cluster'].iloc[0]
    attended_events = df.loc[df['UserID'] == signed_in_user_id, 'EventIDs'].iloc[0]

    # Calculate the most popular event in each cluster
    df_events = pd.DataFrame(events_binarized, columns=mlb.classes_)
    cluster_event_sum = df_events.groupby(df['Cluster']).sum()
    popular_events_by_cluster = cluster_event_sum.apply(lambda x: x.nlargest(3).index.tolist(), axis=1)

    # Recommend events not attended by the user in their cluster
    recommended_events = [event for event in popular_events_by_cluster.loc[user_cluster] if event not in attended_events]

    return recommended_events

if __name__ == "__main__":
    if len(sys.argv) > 1:
        signed_in_user_id = int(sys.argv[1])  # Get signed-in user ID from command-line
        recommended_events = recommend_events_for_user(signed_in_user_id)
        # Output the recommendations in JSON format
        print(json.dumps({"UserID": signed_in_user_id, "RecommendedEvents": recommended_events}, indent=4))
    else:
        print("User ID was not provided as a command-line argument.")
