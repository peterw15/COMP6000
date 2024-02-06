// imports
import React, { useEffect, useState } from 'react'; // react/states
import './societiesPagesStylesheet.css'; // css access
import ImgButton from './components/images/logoIcon.png'; // logo as button
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js'; // navbar
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigate
import { Card } from 'react-bootstrap';
import societyThumbnail from './components/images/compsci.png';
import { Container, Row } from 'react-bootstrap';


function SocietiesPage() {
    // ripple animation
    const [ripple, setRipple] = useState(false);
    const navigate = useNavigate();
    const [societiesList, setSocietiesList] = useState([]);


    // check user is logged in first
    useEffect(() => {
        axios.get('http://localhost:3001/loggedIn', {})
            .then(res => {
                console.log(res);
                if (res.data == null) {
                    navigate("/login");
                } else {
                    getSocieties();
                }
            })
            .catch(error => {
                console.error('Error checking loggedIn status:', error);
            });
    }, []);
    
    // when button is clicked
    const buttonClick = () => {
        setRipple(true);
        setTimeout(() => {
            setRipple(false);
        }, 1000);
    };

    const getSocieties = () => {
        axios.post('http://localhost:3001/societies').then(res => {
            const data = res.data;
            console.log('Societies data:', data);
            const societiesArray = data.map(society => (
                <Card key={society.SocietiesID} className="societyCard">
                    <Card.Img src={societyThumbnail} className="cardImg" alt="Society Thumbnail" />
                    <Card.Body>
                        <Card.Title>{society.socName}</Card.Title>
                        <Card.Text>{society.socDescription}</Card.Text>
                    </Card.Body>
                </Card>
            ));
            setSocietiesList(societiesArray.slice(0, 5)); 
        }).catch(error => {
            console.error('Error fetching societies:', error);
        });
    };

    

    return (
        <>
            <div className="societiesPages">
                <HeaderBar />
                <div className="header">
                    <button
                        className={`societiesButton ${ripple ? 'ripple' : ''}`}
                        onClick={buttonClick}
                    >
                        <p className="societiesText" style={{ color: '#18cdc6' }}>
                            Societies
                        </p>
                        <img
                            src={ImgButton}
                            className="ImgButton"
                        />
                    </button>
                </div>
                <Container className="mainContainer">
                    <div className="societiesHeader"> Societies </div>
                    <Row className="mainRow">{societiesList}</Row>
                </Container>
            </div>
        </>
    );
}

export default SocietiesPage;
