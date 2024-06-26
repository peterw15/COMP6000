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



function JoinedSocieties() {

    const [societies, setSocieties] = useState([]);

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

    function societyPage(SocietyID) {
        navigate("/society?id=" + SocietyID);
    }


    const getMySocieties = () => {
        Axios.post('http://localhost:3001/joinedSocieties').then(res => {
            var dataArray = res.data.map(function (i) {
                var price = i.price;
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
                                        <div className="infoLabel">{i.firstname + " " + i.lastName}</div>
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
                            <Button className="joinButton" onClick={() => societyPage(i.SocietyID, this)}>More Info</Button>
                        </Row>
                    </Card>
                );
            });
            setSocieties(dataArray);
        });
    }
    const goHome = () => {
        navigate("/home");
    }

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", fontFamily: "roboto"  }}>
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/> 
            <HeaderBar></HeaderBar>
            <Container className="mainContainer">
                <div className="eventsHeader">Joined Societies</div>
                <Row classname="mainRow">{societies}</Row>
            </Container>
        </html>
    )
}


export default JoinedSocieties