import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from './studentsEvent.jpg'; 

function EventsCard() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/events') 
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <div style={{ fontFamily: "Rubik", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <header style={{ fontWeight: "bold", marginLeft: "10px", fontSize: "24px", marginBottom: "20px", textShadow: '2px 2px 4px #000000' }}>Your Events</header>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {events.length > 0 ? (
                    events.map((event, index) => {
                        console.log(`ID: ${event.id}, Name: ${event.EventTitle}`); // Log the ID and name of the event
    
                        return (
                            <div key={index} style={{ display: "flex", flexDirection: "row", borderRadius: "50%", border: "1px solid black", padding: "10px", margin: "10px", backgroundColor: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)" }}>
                                <img src={event.EventPic} width="60px" height="100px" />
                                <header style={{ marginTop: "40px" }}>{event.EventTitle}</header>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", border: "1px solid black", width: "100px", height: "100px", backgroundColor: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)" }}>
                        No Events
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventsCard;