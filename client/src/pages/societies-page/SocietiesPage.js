// imports
import React, { useEffect, useState } from 'react';
import './societiesPagesStylesheet.css'; // Ensure this CSS is styled similarly to the eventsPageStyleSheet.css
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import societyThumbnail from './components/images/compsci.png';

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

    const getSocieties = () => {
        axios.post('http://localhost:3001/getSocieties').then(res => {
            const data = res.data;
            console.log(data); // Log the entire data array to see what's in it
    
            const societiesArray = data.map(society => {
                console.log(society); // Log individual society object
    
                return (
                    <Card key={society.SocietiesID} className="societiesCard">
                        <Container>
                            <Row className="societiesCardRow">
                                <Col lg={2} className="societiesImgCol">
                                    <Card.Img src={society.imageURL || societyThumbnail} className="societiesCardImg" />
                                </Col>
                                <Col lg={10} className="societiesInfoCol">
                                    <Card.Title className="societiesCardTitle">{society.socName}</Card.Title>
                                    <Card.Text className="societiesCardText">{society.socDescription}</Card.Text>
                                    <div className="societiesExtraInfo">
                                        <span className="societiesLocation">{society.socLocation}</span>
                                        <br />
                                        <span className="societiesPrice">{society.socPrice == 0 ? 'Price: Free' : "Price: " + society.socPrice}</span>
                                    </div>
                                    <Button className="societiesJoinButton">Join</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
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
