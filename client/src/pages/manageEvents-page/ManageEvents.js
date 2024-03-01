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

        let ename, edesc, elocation, eprice;
        let edate = new Date();

        if (document.getElementById("EventName").value.length > 0) { ename = document.getElementById("EventName").value } else { ename = eventName };
        if (document.getElementById("EventDescription").value.length > 0) { edesc = document.getElementById("EventDescription").value } else { edesc = eventDescription };
        if (document.getElementById("EventLocation").value.length > 0) { elocation = document.getElementById("EventLocation").value } else { elocation = eventLocation };
        if (document.getElementById("EventPrice").value.length > 0) { eprice = document.getElementById("EventPrice").value } else { eprice = eventPrice };
        if ((document.getElementById("EventDate").value !== "") && (document.getElementById("EventTime").value !== "")) { edate = new Date(document.getElementById("EventDate").value + " " + document.getElementById("EventTime").value); edate = edate.toISOString().slice(0, 19).replace('T', ' '); } else { edate = eventDT };



        scriptFunction(ename, edesc, elocation, eprice, edate);
    }

    function scriptFunction(ename, edesc, elocation, eprice, edate) {
        Axios.post('http://localhost:3001/updateEvent', { eventID: chosenEvent.EventID, eventName: ename, eventDescription: edesc, eventPrice: eprice, eventLocation: elocation, eventDateTime: edate })
        setShow(false);
    }

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
            <HeaderBar></HeaderBar>
            <Container className="mainContainer">
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Event Details For: {eventName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label for="EventNameLabel">Event Name:</label>
                            <input type="text" class="form-control" id="EventName" placeholder={eventName} />
                            <label for="EventDescriptionLabel">Event Description:</label>
                            <input type="text" class="form-control" id="EventDescription" placeholder={eventDescription} />
                            <label for="EventLocationLabel">Event Location:</label>
                            <input type="text" class="form-control" id="EventLocation" placeholder={eventLocation} />
                            <label for="EventPriceLabel">Event Price:</label>
                            <input type="text" class="form-control" id="EventPrice" placeholder={eventPrice} />
                            <label for="EventDateLabel">Event Date:</label>
                            <input type="date" class="form-control" id="EventDate" placeholder={"to do"} />
                            <label for="EventTimeLabel">Event Time:</label>
                            <input type="time" class="form-control" id="EventTime" placeholder={"to do"} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button onClick={updateEvent}>
                            Update Event
                        </Button>
                    </Modal.Footer>
                </Modal >
                <div className="eventsHeader">Manage Events</div>
                <Row classname="mainRow">{events}</Row>
            </Container>

        </html>
    )

}

export default ManageEvents