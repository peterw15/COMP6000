import './myBookingsStyleSheet.css';
import React from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';

function MyBookings() {

    const getEvents = () => {
        Axios.post('http://localhost:3001/bookings').then(res => { })
        
    }

    return (
        <>
            <div className="body">
                <div className="header">Your Bookings</div>
            </div >
        </>
    )
}


export default MyBookings