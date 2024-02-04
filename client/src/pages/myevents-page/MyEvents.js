import './myEventsStyleSheet.css';
import React from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import thumbnail from './Images/basketball.png';
import locationPin from './Icons/locationPin.png';
import calendar from './Icons/calendar.png'
import pound from './Icons/pound.png'
import avatar from './Icons/avatar.png'
import background from "./Images/circleBackground1.png";



function MyEvents() {

    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { getMyEvents(); }, [events])

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
            var dataArray = res.data.map(function (i) {
                var date = new Date(i.eventDateTime);
                date = date.toDateString() + " " + date.toLocaleTimeString();
                var price = i.price;
                if (price == 0.00) {
                    price = "Free";
                }
                return (
                    <Card className="eventsCard">
                        <Container flex>
                            <Row className="cardRow">
                                <Col className="imgCol" lg="2">
                                    <Card.Img src={thumbnail} className="cardImg"></Card.Img>
                                </Col>
                                <Col className="infoCol" >
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={locationPin}></img>
                                        <div className="infoLabel">{i.location}</div>
                                        <img className="cardIcon" src={calendar}></img>
                                        <div className="infoLabel">{date}</div>
                                    </Row>
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={pound}></img>
                                        <div className="infoLabel">{price}</div>
                                        <img className="cardIcon" src={avatar}></img>
                                        <div className="infoLabel">{i.firstName + " " + i.lastName}</div>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <Row className="cardTitleRow">
                                <Card.Title className="cardTitle">{i.eventName}</Card.Title>
                            </Row>
                            <br />
                        </Container>
                        <Card.Body className="cardBody">
                            <Card.Text className="cardText">{i.description}</Card.Text>
                        </Card.Body>
                        <Row className="buttonRow">
                            <Button className="joinButton" onClick={() => leaveEvent(i.EventID, this)}>Leave</Button>
                        </Row>
                    </Card>
                );
            });
            setEvents(dataArray);
        });
    }

    function leaveEvent(EventID, button) {
        Axios.post('http://localhost:3001/leaveEvent', { EventID: EventID })
    }


    const goHome = () => {
        navigate("/home");
    }

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <HeaderBar></HeaderBar>
            <Container className="mainContainer">
                <div className="eventsHeader"> Joined Events! </div>
                <Row classname="mainRow">{events}</Row>
            </Container>
        </html>
    )
}


export default MyEvents