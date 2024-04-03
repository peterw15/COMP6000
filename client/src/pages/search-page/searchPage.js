import './searchPageStyleSheet.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import { format } from 'date-fns';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import thumbnail from './Images/basketball.png';
import locationPin from './Icons/locationPin.png';
import calendar from './Icons/calendar.png';
import pound from './Icons/pound.png';
import avatar from './Icons/avatar.png';
import tick from './Icons/check-mark.png';
import background from "./Images/circleBackground1.png";

function SearchPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [descriptionTerm, setDescriptionTerm] = useState('');
    const [locationTerm, setLocationTerm] = useState('');
    const [organiserTerm, setOrganiserTerm] = useState('');
    const [priceTerm, setPriceTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);

    function SearchResultCard({ result }) {
        return (
            <Card className="searchEventsCard">
                <Container>
                    <Row className="searchCardRow">
                        <Col className="searchImgCol" lg="2">
                            <Card.Img src={result.imageURL} className="searchCardImg"></Card.Img>
                        </Col>
                        <Col className="searchInfoCol">
                            <Row className="searchInfoRow">
                                <img className="searchCardIcon" src={locationPin} alt="Location Icon"></img>
                                <div className="searchInfoLabel">{result.location}</div>
                                <img className="searchCardIcon" src={calendar} alt="Calendar Icon"></img>
                                <div className="searchInfoLabel">{format(new Date(result.eventDateTime), "EEE MMM dd yyyy HH:mm:ss")}</div>
                            </Row>
                            <Row className="searchInfoRow">
                                <img className="searchCardIcon" src={pound} alt="Pound Icon"></img>
                                <div className="searchInfoLabel">{result.price}</div>
                                <img className="searchCardIcon" src={avatar} alt="Avatar Icon"></img>
                                <div className="searchInfoLabel">{result.organiserFirstName} {result.organiserLastName}</div>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <Row className="searchCardTitleRow">
                        <Card.Title className="searchCardTitle">{result.eventName}</Card.Title>
                    </Row>
                    <br />
                    <br />
                </Container>
                <Card.Body className="searchCardBody">
                    <Card.Text className="searchCardText">{result.description}</Card.Text>
                </Card.Body>
                <Row className="searchButtonRow">
                    <Button className="searchJoinButton" id={result.EventID + "button"} onClick={() => joinEvent(result.EventID)}>Join</Button>
                    <img src={tick} id={result.EventID + "tick"} className="searchJoinedIcon" alt="Joined Icon" hidden></img>
                </Row>
            </Card>
        );
    }
    

    function joinEvent(EventID) {
        Axios.post('http://localhost:3001/joinEvent', {
            EventID: EventID
        }).then(res => {
            document.getElementById(EventID + "button").hidden = true;
            document.getElementById(EventID + "tick").hidden = false;
        }).catch(error => {
            console.log(error);
        });
    }

    const handleSearch = async () => {
        try {
            const response = await Axios.post('http://localhost:3001/api/search', {
                searchTerm: searchTerm,
                descriptionTerm: descriptionTerm,
                locationTerm: locationTerm,
                organiserTerm: organiserTerm,
                priceTerm: priceTerm
            });
            setSearched(true);
            setSearchResults(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSort = (sortBy) => {
        const sortedResults = [...searchResults].sort((a, b) => {
            if (sortBy === 'price') {
                return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
            } else {
                return a[sortBy].localeCompare(b[sortBy]);
            }
        });
        setSearchResults(sortedResults);
    };

    return (
        <html className="searchPage" style={{ 
            backgroundImage: `url(${background})`, 
            minHeight: "1080px", 
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            backgroundAttachment: "fixed", 
            fontFamily: "Roboto" 
        }}>
            <HeaderBar></HeaderBar>
            <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/> 
            <Container className="searchMainContainer" style={{ marginTop: '20px' }}>
                <div className="searchPageHeader" style={{ fontFamily: "Roboto" }}>Search Events</div>
                <div className="searchPageForm">
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="searchPageFormInput"
                    />
                    <br/>
                    <button id="searchButton" className="searchPageButton" onClick={handleSearch}>
                        Search
                    </button>
                    {searchResults.length > 0 && (
                        <div className="searchPageDropDown" style={{ fontFamily: "Roboto" }}>
                            <label htmlFor="sortBy">Sort By:</label>
                            <select id="sortBy" onChange={(e) => handleSort(e.target.value)} defaultValue="">
                                <option value="" disabled hidden>Select an option</option>
                                <option value="eventName">Event Name</option>
                                <option value="eventDateTime">Date Time</option>
                                <option value="location">Location</option>
                                <option value="organiserFirstName">Organiser</option>
                                <option value="price">Price</option>
                            </select>
                        </div>
                    )}
                    <div className="searchPageResults" style={{ fontFamily: "Roboto" }}>
                        {searched && searchResults.length > 0 ? (
                            <Container>
                                {searchResults.map((result, index) => (
                                    <SearchResultCard key={index} result={result} />
                                ))}
                            </Container>
                        ) : (
                            searched && <p>No results found.</p>
                        )}
                    </div>
                </div>
            </Container>
        </html>
    );
}

export default SearchPage;
