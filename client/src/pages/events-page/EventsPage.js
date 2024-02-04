import './eventsPageStyleSheet.css';
import { Link } from "react-router-dom";
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function EventsPage() {

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if (res.data == null) {
                navigate("/login");
            }
            else {
                getEvents();
            }
        });
    }, [])

    const getEvents = () => {
        Axios.post('http://localhost:3001/events').then(res => {
            var dataArray = res.data.map(function (i) {
                return (
                    <Container flex className = "eventsContainer">
                        <Card className = "eventsCard bg-custom">
                            <Card.Body className="cardBody">
                                <Card.Title className="cardTitle">{i.eventName}</Card.Title>
                                <Card.Text className="cardText">Location: {i.location}</Card.Text>
                                <Card.Text className="cardText">Date/Time: {i.eventDateTime}</Card.Text>
                                <Card.Text className="cardText">Price: {i.price}</Card.Text>
                                <Card.Text className="cardText">Description: {i.description}</Card.Text>
                                <Card.Text className="cardText">Organiser: {i.firstName + " " + i.lastName}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                    
                );
            });
            console.log(dataArray);
            setListState(dataArray);
        });
    }

    function test() {
        console.log("e");
    }

    function joinEvent(EventID, button) {
        console.log("eee");
        Axios.post('http://localhost:3001/joinEvent', {
            EventID: EventID
        }).then(res => {

        });
    }

    const goHome = () => {
        navigate("/home");
    }


    const [listState, setListState] = useState([]);

    return (
        <>
            <HeaderBar></HeaderBar>
            <div className="eventsContainer">
                <div className="header"> Events </div>
                {listState}
            </div>
        </>
    );
}

export default EventsPage
