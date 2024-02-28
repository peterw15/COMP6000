import './searchPageStyleSheet.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import { format } from 'date-fns';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import thumbnail from './Images/basketball.png';
import locationPin from './Icons/locationPin.png';
import calendar from './Icons/calendar.png';
import pound from './Icons/pound.png';
import avatar from './Icons/avatar.png';
import tick from './Icons/check-mark.png';

function SearchPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [descriptionTerm, setDescriptionTerm] = useState('');
    const [locationTerm, setLocationTerm] = useState('');
    const [organiserTerm, setOrganiserTerm] = useState('');
    const [priceTerm, setPriceTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState(false);

function SearchResultCard({result}) {
    console.log(result);
    return (
        <Card className="eventsCard">
            <Container flex>
                <Row className="cardRow">
                    <Col className="imgCol" lg="2">
                        <Card.Img src={result.imageURL} className="cardImg"></Card.Img>
                    </Col>
                    <Col className="infoCol" >
                        <Row className="infoRow">
                            <img className="cardIcon" src={locationPin}></img>
                            <div className="infoLabel">{result.location}</div>
                            <img className="cardIcon" src={calendar}></img>
                            <div className="infoLabel">{format(new Date(result.eventDateTime), "EEE MMM dd yyyy HH:mm:ss")}</div>
                        </Row>
                        <Row className="infoRow">
                            <img className="cardIcon" src={pound}></img>
                            <div className="infoLabel">{result.price}</div>
                            <img className="cardIcon" src={avatar}></img>
                            <div className="infoLabel">{result.organiserFirstName} {result.organiserLastName}</div>
                        </Row>
                    </Col>
                </Row>
                <br />
                <Row className="cardTitleRow">
                    <Card.Title className="cardTitle">{result.eventName}</Card.Title>
                </Row>
                <br />
            </Container>
            <Card.Body className = "cardBody">
                <Card.Text className="cardText">{result.description}</Card.Text>
            </Card.Body>
            <Row className="buttonRow">
                <Button className="joinButton" id = {result.EventID + "button"} onClick={() => joinEvent(result.EventID, this)}>Join</Button>
                <img src={tick} id ={result.EventID + "tick"} className= "joinedIcon" hidden></img>
            </Row>
        </Card>
    )
}

function joinEvent(EventID, button) {
    Axios.post('http://localhost:3001/joinEvent', {
        EventID: EventID
    }).then(res => {

    })
    document.getElementById(EventID + "button").hidden = true;
    document.getElementById(EventID + "tick").hidden = false;
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
            setSearched(true); // Set searched flag to true
    
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
                if (a[sortBy] < b[sortBy]) return -1;
                if (a[sortBy] > b[sortBy]) return 1;
                return 0;
            }
        });
        setSearchResults(sortedResults);
    };
    
    return (
        <>
            <HeaderBar />
            <div className="searchPage">
                <br />
                <br />
                <div className="searchPageHeader"> Search Events</div>
                <div className="searchPageForm">
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="searchPageFormInput"
                    />
                    <br />
                    <br />
                    <button id="searchButton" className="searchPageButton" onClick={handleSearch}>
                        Search
                    </button>
                    <div class="searchPageDropDown" style={{ display: searchResults.length > 0 ? 'block' : 'none' }}>
                        <label htmlFor="sortBy">Sort By:</label>
                        <select id="sortBy" onChange={(e) => handleSort(e.target.value)} defaultValue="">
                            <option value="" disabled hidden>Select an option</option>
                            <option value="eventName">Event Name</option>
                            <option value="eventDateTime">Date Time</option>
                            <option value="location">Location</option>
                            <option value="organiser">Organiser</option>
                            <option value="price">Price</option>
                        </select>
                    </div>

                    {/* Display search results */}
                    <div className="searchPageResults">
                        {searchResults.length > 0 ? (
                            <Container>
                                {searchResults.map((result, index) => (
                                <SearchResultCard key={index} result={result} />
                                ))}
                            </Container>
                        ) : (
                            searchTerm!== '' && searched && searchResults.length === 0 &&(
                                <p>No results found.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchPage;
