// SearchPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';


function SearchPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await Axios.post('http://localhost:3001/api/search', {
                searchTerm: searchTerm,
            });

            // Assuming your server returns an array of search results
            setSearchResults(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderBar></HeaderBar>
            <div className="searchPage">
                <div className="header"> Search </div>
                <div className="form">
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <br />
                    <button id="searchButton" className="btn" onClick={handleSearch}>
                        Search
                    </button>

                    {/* Display search results */}
                    <div className="searchResults">
                        {searchResults.length > 0 ? (
                            <ul>
                                {searchResults.map((result, index) => (
                                    <li key={index}>
                                        <p>Event Name: {result.eventName}</p>
                                        <p>Event Date Time: {result.eventDateTime}</p>
                                        <p>Event Location: {result.location}</p>
                                        <p>Event Description: {result.description}</p>
                                        <p>Event Organiser: {result.organiser}</p>
                                        <p>Event Price: {result.price}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>

                    <Link to="/home">
                        <button id="backToHome" className="btn">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SearchPage;
