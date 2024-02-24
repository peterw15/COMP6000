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

    const [eventName, setEventName] = useState();
    const [eventDescription, setEventDescription] = useState();
    const [eventLocation, setEventLocation] = useState();
    const [eventPrice, setEventPrice] = useState();
    const [eventDT, setEventDT] = useState();
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");

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
                                setEventName(i.eventName);
                                setEventDescription(i.description);
                                setEventPrice(i.price);
                                setEventLocation(i.location);
                                let d = new Date(i.eventDateTime)
                                d = d.toISOString().slice(0, 19).replace('T', ' ');
                                setEventDT(d);
                                setchosenEvent(i);
                                setShow(true);

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

        if (document.getElementById("EventName").value.length > 0) { setEventName(document.getElementById("EventName").value) };
        if (document.getElementById("EventDescription").value.length > 0) { setEventDescription(document.getElementById("EventDescription").value) };
        if (document.getElementById("EventLocation").value.length > 0) { setEventLocation(document.getElementById("EventLocation").value) };
        if (document.getElementById("EventPrice").value.length > 0) { setEventPrice(document.getElementById("EventPrice").value) };
        if ((document.getElementById("EventDate") !== null) && (document.getElementById("EventTime") !== null)) { setEventDT(document.getElementById("EventDate").value + " " + document.getElementById("EventTime").value) };

        console.log(eventName)

        Axios.post('http://localhost:3001/updateEvent', { eventID: chosenEvent.EventID, eventName: eventName, eventDescription: eventDescription, eventPrice: eventPrice, eventLocation: eventLocation, eventDate: eventDT })
        setShow(false);
    }

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed"  }}>
            <HeaderBar></HeaderBar>
            <Container className="mainContainer">
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Event Details For: {eventName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label for="EventName">Event Name:</label>
                            <input type="text" class="form-control" id="EventName" placeholder={eventName} />
                            <label for="EventDescription">Event Description:</label>
                            <input type="text" class="form-control" id="EventDescription" placeholder={eventDescription} />
                            <label for="EventLocation">Event Location:</label>
                            <input type="text" class="form-control" id="EventLocation" placeholder={eventLocation} />
                            <label for="EventPrice">Event Price:</label>
                            <input type="text" class="form-control" id="EventPrice" placeholder={eventPrice} />
                            <label for="EventDate">Event Date:</label>
                            <input type="date" class="form-control" id="EventDate" placeholder={"to do"} />
                            <label for="EventTime">Event Time:</label>
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