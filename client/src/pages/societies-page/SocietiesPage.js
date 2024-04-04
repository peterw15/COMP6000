// imports
import React, { useEffect, useState } from 'react';
import './societiesPagesStylesheet.css'; // Ensure this CSS is styled similarly to the eventsPageStyleSheet.css
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import societyThumbnail from './components/images/compsci.png';
import locationPin from './Icons/locationPin.png';
import calendar from './Icons/calendar.png';
import pound from './Icons/pound.png';
import avatar from './Icons/avatar.png';

function SocietiesPage() {
    const navigate = useNavigate();
    const [societiesList, setSocietiesList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/loggedIn').then(res => {
            if (res.data == null) {
                navigate("/login");
            } else {
                getSocieties();
            }
        }).catch(error => {
            console.error('Error checking loggedIn status:', error);
        });
    }, []);

    function societyPage(SocietyID) {
        navigate("/society?id=" + SocietyID);
    }

    const getSocieties = () => {
        axios.post('http://localhost:3001/getSocieties').then(res => {
            const data = res.data;
            console.log(data); // Log the entire data array to see what's in it
    
            const societiesArray = data.map(society => {
                console.log(society); // Log individual society object
                    var price = society.socPrice;
                    if (price == 0.00 || price == null) {
                        price = "Free";
                    }
                return (
                    <Card className="eventsCard">
                        <Container flex>
                            <Row className="cardRow">
                                <Col className="imgCol" lg="2">
                                    <Card.Img src={society.imageURL} className="cardImg"></Card.Img>
                                </Col>
                                <Col className="infoCol" >
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={locationPin}></img>
                                        <div className="infoLabel">{society.socLocation}</div>
                                        <img className="cardIcon" src={avatar}></img>
                                        <div className="infoLabel">{society.firstName + " " + society.lastName}</div>
                                    </Row>
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={pound}></img>
                                        <div className="infoLabel">{price}</div>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <Row className="cardTitleRow">
                                <Card.Title className="cardTitle">{society.socName}</Card.Title>
                            </Row>
                            <br />
                        </Container>
                        <Card.Body className="cardBody">
                            <Card.Text className="cardText">{society.socDescription}</Card.Text>
                        </Card.Body>
                        <Row className="buttonRow">
                            <Button className="editButton" onClick={() => {societyPage(society.SocietyID)}}>More Info</Button>
                        </Row>
                    </Card >
                );
            });
    
            setSocietiesList(societiesArray);
        }).catch(error => {
            console.error('Error fetching societies:', error);
        });
    };
    
    

    return (
        <div className="societiesPage" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <HeaderBar />
            <Container className="mainContainer">
                <div className="societiesHeader"> Societies </div>
                <Row className="mainRow">{societiesList}</Row>
            </Container>
        </div>
    );
    
}

export default SocietiesPage;
