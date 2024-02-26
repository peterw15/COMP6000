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
import Button from 'react-bootstrap/Button';
import thumbnail from './Images/basketball.png';
import locationPin from './Icons/locationPin.png';
import calendar from './Icons/calendar.png'
import pound from './Icons/pound.png'
import avatar from './Icons/avatar.png'
import background from "./Images/circleBackground1.png";
import tick from "./Icons/check-mark.png";


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
                var date = new Date(i.eventDateTime);
                date = date.toDateString() + " " + date.toLocaleTimeString();
                var price = i.price;
                if (price == 0.00) {
                    price = "Free";
                }
                console.log(res.data)
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
                            <Button className="joinButton" id ={i.EventID + "button"} onClick={() => joinEvent(i.EventID, this)}>Join</Button>
                            <img src={tick} id ={i.EventID + "tick"} className= "joinedIcon" hidden></img>
                        </Row>
                    </Card>
                );
            });
            setListState(dataArray);
        });
    }

    function joinEvent(EventID, button) {
        Axios.post('http://localhost:3001/joinEvent', {
            EventID: EventID
        }).then(res => {

        })
        document.getElementById(EventID + "button").hidden = true;
        document.getElementById(EventID + "tick").hidden = false;
    }

    const [listState, setListState] = useState([]);

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", fontFamily: "roboto" }}>
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/>  
            <HeaderBar></HeaderBar>
            <Container className="mainContainer">
                <div className="eventsHeader" style={{fontFamily: "roboto"}}> Events </div>
                <Row classname="mainRow">{listState}</Row>
            </Container>
        </html>
    );
}

export default EventsPage
