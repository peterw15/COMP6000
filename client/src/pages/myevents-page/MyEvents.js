import './myEventsStyleSheet.css';
import React from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';




function MyEvents() {

    const [events, setEvents] = useState(["No Events Joined!"]);

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if (res.data == null) {
                navigate("/login");
            }
            else {
                getMyEvents();
            }
        });
    }, [])


    const getMyEvents = () => {
        Axios.post('http://localhost:3001/myevents').then(res => {
            var eventsData = res.data.map(function (i) {
                return (
                    <div style={{ border: "1px solid hsl(231, 77%, 78%)", margin: "10px", paddingLeft: "10px" }}>
                        <h1 className="eventInfoHeader">{i.eventName}</h1>
                        <button onClick={() => leaveEvent(i.EventID, this)}> Leave! </ button>
                        <div className="eventInfo">{i.description}</div>
                        <div className="eventInfo">Location: {i.location}</div>
                        <div className="eventInfo">Date/Time: {i.eventDateTime}</div>
                        <div className="eventInfo">Price: {i.price}</div>
                        <br />
                    </div>
                );
            });
            setEvents(eventsData);
        });
    }

    function leaveEvent(EventID, button) {
        Axios.post('http://localhost:3001/leaveEvent', { EventID: EventID })
        getMyEvents();
        console.log("clicked")
    }


    const goHome = () => {
        navigate("/home");
    }

    return (
        <>
            <HeaderBar></HeaderBar>
            <div className="body">
                <div className="header">Your Events</div>
                {events}
            </div >
        </>
    )
}


export default MyEvents