import './ManageEventsStyleSheet.css';
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
import calendar from './Icons/calendar.png';
import pound from './Icons/pound.png';
import avatar from './Icons/avatar.png';
import background from "./Images/circleBackground1.png";
import Modal from 'react-bootstrap/Modal';


function ManageEvents() {


    const [events, setEvents] = useState([]);
    const [chosenEvent, setchosenEvent] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var event;

    const navigate = useNavigate();

    useEffect(() => { getMyEvents(); }, [events])

    const getMyEvents = () => {
        Axios.post('http://localhost:3001/myCreatedEvents').then(res => {
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
                            <Button className="editButton" onClick={() => {
                                setShow(true);
                                setchosenEvent(i);
                            }}> Edit Event </Button>
                            <Button className="deleteButton" onClick={() => deleteEvent(i.EventID, this)}>Delete Event</Button>
                        </Row>
                    </Card >
                );
            });
            setEvents(dataArray);
        });
    }

    function deleteEvent(EventID, button) {
        Axios.post('http://localhost:3001/deleteEvent', { EventID: EventID })
    }

    const goHome = () => {
        navigate("/home");
    }

    function updateEvent() {
        var eventName = document.getElementById("EventName").value;
        var eventDescription = document.getElementById("EventDescription").value;
        var eventPrice = document.getElementById("EventLocation").value;
        var eventLocation = document.getElementById("EventPrice").value;
        var eventDate = document.getElementById("EventDate").value + " " + document.getElementById("EventTime").value;

        console.log(eventName)
        console.log(eventDate)

        Axios.post('http://localhost:3001/updateEvent', { eventID: chosenEvent.EventID, eventName: eventName, eventDescription: eventDescription, eventPrice: eventPrice, eventLocation: eventLocation, eventDate: eventDate })


    }

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center" }}>
            <HeaderBar></HeaderBar>
            <Container className="mainContainer">
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Event Details For: {chosenEvent.eventName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label for="EventName">Event Name:</label>
                            <input type="text" class="form-control" id="EventName" placeholder={chosenEvent.eventName} />
                            <label for="EventName">Event Description:</label>
                            <input type="text" class="form-control" id="EventDescription" placeholder={chosenEvent.description} />
                            <label for="EventName">Event Location:</label>
                            <input type="text" class="form-control" id="EventLocation" placeholder={chosenEvent.location} />
                            <label for="EventName">Event Price:</label>
                            <input type="text" class="form-control" id="EventPrice" placeholder={chosenEvent.price} />
                            <label for="EventName">Event Date:</label>
                            <input type="date" class="form-control" id="EventDate" placeholder={"to do"} />
                            <label for="EventName">Event Time:</label>
                            <input type="time" class="form-control" id="EventTime" placeholder={"to do"} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button onClick={updateEvent}>
                            Update Event
                        </Button>
                    </Modal.Footer>
                </Modal >
                <div className="eventsHeader">Manage Your Created Events!</div>
                <Row classname="mainRow">{events}</Row>
            </Container>

        </html>
    )

}

export default ManageEvents