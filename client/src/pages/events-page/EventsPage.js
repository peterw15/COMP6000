import './eventsPageStyleSheet.css';
import {Link} from "react-router-dom";
import Axios from 'axios';
import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';


function EventsPage() {

    const navigate = useNavigate();


    const getEvents = () => {
        Axios.post('http://localhost:3001/events').then(res => {
            var dataArray = res.data.map(function(i) {
                return (
                    <div style={{border : "1px solid hsl(231, 77%, 78%)", margin : "10px", paddingLeft : "10px"} }>
                        <h1 className="eventInfoHeader">{i.eventName}</h1>
                        <div className="eventInfo">Location: {i.location}</div>
                        <div className="eventInfo">Date/Time: {i.eventDateTime}</div>
                        <div className="eventInfo">Price: {i.price}</div>
                        <br />
                    </div>
                );
            });
            console.log(dataArray);
            setListState(dataArray);
        });
    }

    const goHome = () => {
        navigate("/home");
    }

    useEffect(() => {
        getEvents();
    },[]);


    const [listState, setListState] = useState([]);

    return (
        <>
        <div className="eventsPage">
            <div>
            <button className="btn" onClick={goHome}>Home</button>
            </div>
            <div className="header"> Events </div>
                    {listState}
            </div>
        </>
    );
}

export default EventsPage
