import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <div>
            {events.map((event, index) => {
                console.log(`ID: ${event.id}, Name: ${event.EventTitle}`); // Log the ID and name of the event

                return (
                    <div key={index} style={{ display: "flex", flexDirection: "row" }}>
                        <img src={event.EventPic} width="60px" height="100px" />
                        <header style={{ marginTop: "40px" }}>{event.EventTitle}</header>
                    </div>
                );
            })}
        </div>
    );
}

export default EventsCard;