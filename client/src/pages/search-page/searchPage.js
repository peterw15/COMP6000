import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import { format } from 'date-fns';

function SearchPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [descriptionTerm, setDescriptionTerm] = useState('');
    const [locationTerm, setLocationTerm] = useState('');
    const [organiserTerm, setOrganiserTerm] = useState('');
    const [priceTerm, setPriceTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await Axios.post('http://localhost:3001/api/search', {
                searchTerm: searchTerm,
                descriptionTerm: descriptionTerm,
                locationTerm: locationTerm,
                organiserTerm: organiserTerm,
                priceTerm: priceTerm
            });

            setSearchResults(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <>
            <HeaderBar />
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
                            <table className="searchTable">
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Date Time</th>
                                        <th>Location</th>
                                        <th>Description</th>
                                        <th>Organiser</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.eventName}</td>
                                            <td>{format(new Date(result.eventDateTime), "EEEE do MMMM HH:mm")}</td>
                                            <td>{result.location}</td>
                                            <td>{result.description}</td>
                                            <td>{result.organiser}</td>
                                            <td>{"£" + result.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
