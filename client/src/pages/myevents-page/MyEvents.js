import './myEventsStyleSheet.css';
import React from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';

function myEvents() {

    const getEvents = () => {
        Axios.post('http://localhost:3001/bookings').then(res => { })
    }

    return (
        <>
            <div className="body">
                <div className="header">Your Events</div>
            </div >
        </>
    )
}


export default myEvents