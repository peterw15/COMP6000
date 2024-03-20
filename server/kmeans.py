import mysql.connector  # CONNECTING TO DB
import json  # TRANSFERING DATA TO FRONTEND
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import MultiLabelBinarizer

#HOW TO RUN KMEANS 
#CHANGE THE FILE LOCATION TO YOUR LOCAL ONE. --> bottom of index.js
#OPEN A NEW TERMINAL. python3 kmeans.py
#IF ANY ERRORS. pip3 install --- (said error of missing module)
#CURRENT BUGS --> refreshing or SQL ending shows data sometimes not? WIP.
# DATABASE SETUP
database_setup = {
    'host': 'dragon.kent.ac.uk',
    'user': 'comp6000_09',
    'password': 'p3oulla',
    'database': 'comp6000_09'
}

def fetch_events():
    try:
        # CONNECT TO THE DATABASE
        connection = mysql.connector.connect(**database_setup)
        cursor = connection.cursor(dictionary=True)
        
        # SELECTS THE USER AND GIVES YOU ALL THE EVENTS CONNECTED TO IT THROUGH THE EVENTREGISTRATION TABLE
        query = """
                SELECT 
                    er.UserID, 
                    GROUP_CONCAT(er.EventID) AS EventIDs
                FROM 
                    EventRegistration er
                GROUP BY 
                    er.UserID;
                """
        
        # EXECUTE QUERY
        cursor.execute(query)
        events = cursor.fetchall()
        
        return events
    except mysql.connector.Error as error:
        print(f"Unable to reach database table: {error}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL Connection now closed")

if __name__ == "__main__":
    events = fetch_events()

    # TRANSFORM DATA INTO INTEGERS FROM STRINGS
    data = [
        {"UserID": user["UserID"], "EventIDs": list(map(int, user["EventIDs"].split(',')))}
        for user in events
    ]

    # CONVERT INTO DATAFRAME
    df = pd.DataFrame(data)

    # TRANSFORM LIST OF IDS INTO BINARY NUMBERS
    mlb = MultiLabelBinarizer()

    # FITS AND TRANSFORMS DATA
    events_binarized = mlb.fit_transform(df['EventIDs'])

    # PERFORM K-MEANS
    n_clusters = 3  # ADJUSTABLE NUMBER OF CLUSTERS
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    df['Cluster'] = kmeans.fit_predict(events_binarized)

    # CALCULATES MOST POPULAR EVENT IN EACH CLUSTER
    df_events = pd.DataFrame(events_binarized, columns=mlb.classes_)
    cluster_event_sum = df_events.groupby(df['Cluster']).sum()
    popular_events_by_cluster = cluster_event_sum.apply(lambda x: x.nlargest(3).index.tolist(), axis=1)

    # GENERATES A RECOMMENDATION
    def recommend_events_corrected(user_id, user_cluster, attended_events):
        popular_events = popular_events_by_cluster.loc[user_cluster]
        return [event for event in popular_events if event not in attended_events]

    df['RecommendedEvents'] = df.apply(lambda x: recommend_events_corrected(x['UserID'], x['Cluster'], x['EventIDs']), axis=1)

    # OUTPUT RECOMMENDED
    print(df[['UserID', 'EventIDs', 'Cluster', 'RecommendedEvents']].to_json(orient='records', indent=4))