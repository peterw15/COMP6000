//import './ManageEventsStyleSheet.css';
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
import locationPin from './Icons/locationPin.png';
import calendar from './Icons/calendar.png';
import pound from './Icons/pound.png';
import avatar from './Icons/avatar.png';
import background from "./Images/circleBackground1.png";
import Modal from 'react-bootstrap/Modal';


function ManageSocieties() {

    const [societies, setSocieties] = useState([]);
    const [chosenSociety, setChosenSociety] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [SocietyName, setSocietyName] = useState();
    const [SocietyDescription, setSocietyDescription] = useState();
    const [SocietyLocation, setSocietyLocation] = useState();
    const [SocietyLink, setSocietyLink] = useState();

    const [SocietyPrice, setSocietyPrice] = useState();
    const [eventDT, setEventDT] = useState();

    const navigate = useNavigate();
    useEffect(() => { getMySocieties(); }, [societies])

    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if (res.data == null) {
                navigate("/login");
            }
            else {
                getMySocieties();
            }
        });
    }, [])

    const getMySocieties = () => {
        Axios.post('http://localhost:3001/myCreatedSocieties').then(res => {

            console.log(res);
            var dataArray = res.data.map(function (i) {
                var price = i.socPrice;
                if (price == 0.00 || price == null) {
                    price = "Free";
                }
                return (
                    <Card className="eventsCard">
                        <Container flex>
                            <Row className="cardRow">
                                <Col className="imgCol" lg="2">
                                    <Card.Img src={i.imageURL} className="cardImg"></Card.Img>
                                </Col>
                                <Col className="infoCol" >
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={locationPin}></img>
                                        <div className="infoLabel">{i.socLocation}</div>
                                        <img className="cardIcon" src={avatar}></img>
                                        <div className="infoLabel">{i.firstName + " " + i.lastName}</div>
                                    </Row>
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={pound}></img>
                                        <div className="infoLabel">{price}</div>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <Row className="cardTitleRow">
                                <Card.Title className="cardTitle">{i.socName}</Card.Title>
                            </Row>
                            <br />
                        </Container>
                        <Card.Body className="cardBody">
                            <Card.Text className="cardText">{i.socDescription}</Card.Text>
                        </Card.Body>
                        <Row className="buttonRow">
                            <Button className="editButton" onClick={() => {
                                setSocietyName(i.socName);
                                setSocietyDescription(i.socDescription);
                                setSocietyPrice(i.socPrice);
                                setSocietyLink(i.socLink);
                                setChosenSociety(i);
                                setShow(true);
                            }}> Edit Society </Button>
                            <Button className="deleteButton" onClick={() => deleteSociety(i.SocietyID, this)}>Delete Society</Button>
                        </Row>
                    </Card >
                );
            });
            setSocieties(dataArray);
        });
    }

    function deleteSociety(SocietyID, button) {
        Axios.post('http://localhost:3001/getSocietyEvents', {SocietyID}).then(res => {
            res.data.map(function (i) {
                alert(i.EventID);
                Axios.post('http://localhost:3001/deleteEvent',{EventID : i.EventID});
            })
        }).then(
            Axios.post('http://localhost:3001/deleteSociety', { SocietyID : SocietyID})
        )
    }

    const goHome = () => {
        navigate("/home");
    }

    function updateSociety() {

        let socName, socDesc, socPrice, socLink, socLocation;

        if (document.getElementById("SocietyName").value.length > 0) { socName = document.getElementById("SocietyName").value } else { socName = SocietyName };
        if (document.getElementById("SocietyDescription").value.length > 0) { socDesc = document.getElementById("SocietyDescription").value } else { socDesc = SocietyDescription };
        if (document.getElementById("SocietyLocation").value.length > 0) { socLocation = document.getElementById("SocietyLocation").value } else { socLocation = SocietyLocation };
        if (document.getElementById("SocietyPrice").value.length > 0) { socPrice = document.getElementById("SocietyPrice").value } else { socPrice = SocietyPrice };
        if ((document.getElementById("SocietyLink").value !== "") && (document.getElementById("SocietyLink").value !== "")) {socLink = document.getElementById("SocietyLink").value} else { socLink = SocietyLink };



        scriptFunction(socName, socDesc, socLocation, socPrice, socLink);
    }

    function scriptFunction(socName, socDesc, socLocation, socPrice, socLink) {
        Axios.post('http://localhost:3001/updateSociety', { SocietyID: chosenSociety.SocietyID, socName: socName, socDescription: socDesc, socPrice: socPrice, socLocation: socLocation, socLink: socLink })
        setShow(false);
    }

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", fontFamily: "roboto" }}>
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/>  
            <HeaderBar></HeaderBar>
            <Container className="mainContainer">
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Event Details For: {SocietyName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label for="EventNameLabel">Society Name:</label>
                            <input type="text" class="form-control" id="SocietyName" placeholder={SocietyName} />
                            <label for="EventDescriptionLabel">Society Description:</label>
                            <input type="text" class="form-control" id="SocietyDescription" placeholder={SocietyDescription} />
                            <label for="EventLocationLabel">Society Location:</label>
                            <input type="text" class="form-control" id="SocietyLocation" placeholder={SocietyLocation} />
                            <label for="EventPriceLabel">Society Price:</label>
                            <input type="text" class="form-control" id="SocietyPrice" placeholder={SocietyPrice} />
                            <label for="EventDateLabel">Society Link:</label>
                            <input type="text" class="form-control" id="SocietyLink" placeholder={SocietyLink} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button onClick={updateSociety}>
                            Update Society
                        </Button>
                    </Modal.Footer>
                </Modal >
                <div className="eventsHeader">Manage Societies</div>
                <Row classname="mainRow">{societies}</Row>
            </Container>

        </html>
    )

}

export default ManageSocieties