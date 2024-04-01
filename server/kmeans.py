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
        connection = mysql.connector.connect(**database_setup)
        cursor = connection.cursor(dictionary=True)
        
        query = """
                SELECT 
                    er.UserID, 
                    GROUP_CONCAT(er.EventID) AS EventIDs
                FROM 
                    EventRegistration er
                GROUP BY 
                    er.UserID;
                """
        
        cursor.execute(query)
        events = cursor.fetchall()
        
        return events
    except mysql.connector.Error as error:
        print(f"Unable to reach database table: {error}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

def fetch_event_details(event_ids):
    """
    Fetches details for a list of event IDs, including organizer name, price, and image URL.
    """
    try:
        connection = mysql.connector.connect(**database_setup)
        cursor = connection.cursor(dictionary=True)
        
        format_strings = ','.join(['%s'] * len(event_ids))
        cursor.execute(f"""
            SELECT 
                e.eventID, 
                e.eventName, 
                e.eventDateTime, 
                e.location, 
                e.description, 
                e.price, 
                u.firstName AS organiserFirstName, 
                u.lastName AS organiserLastName,
                e.imageURL
            FROM 
                Event e
                JOIN User u ON e.organiser = u.UserID
            WHERE 
                e.eventID IN ({format_strings})
            """, tuple(event_ids))
        
        event_details = cursor.fetchall()
        # Formatting the organiser's name 
        for event in event_details:
            event['organiserName'] = f"{event.pop('organiserFirstName')} {event.pop('organiserLastName')}"
        return event_details
    except mysql.connector.Error as error:
        print(f"Error fetching event details: {error}")
        return []
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()


def recommend_events_for_user(signed_in_user_id):
    events = fetch_events()
    data = [
        {"UserID": user["UserID"], "EventIDs": list(map(int, user["EventIDs"].split(',')))}
        for user in events
    ]
    df = pd.DataFrame(data)

    if signed_in_user_id not in df['UserID'].values:
        print("User has no event registrations.")
        return []

    mlb = MultiLabelBinarizer()
    events_binarized = mlb.fit_transform(df['EventIDs'])
    kmeans = KMeans(n_clusters=3, random_state=42)
    df['Cluster'] = kmeans.fit_predict(events_binarized)

    user_cluster = df.loc[df['UserID'] == signed_in_user_id, 'Cluster'].iloc[0]
    attended_events = df.loc[df['UserID'] == signed_in_user_id, 'EventIDs'].iloc[0]

    df_events = pd.DataFrame(events_binarized, columns=mlb.classes_)
    cluster_event_sum = df_events.groupby(df['Cluster']).sum()
    popular_events_by_cluster = cluster_event_sum.apply(lambda x: x.nlargest(3).index.tolist(), axis=1)

    recommended_events = [event for event in popular_events_by_cluster.loc[user_cluster] if event not in attended_events]

    # Fetch and return information for each recommended event
    event_details = fetch_event_details(recommended_events)
    return {"UserID": signed_in_user_id, "RecommendedEvents": event_details}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        signed_in_user_id = int(sys.argv[1])
        recommended_events_info = recommend_events_for_user(signed_in_user_id)
        print(json.dumps(recommended_events_info, default=str, indent=4))
    else:
        print("User ID was not provided as a command-line argument.")
