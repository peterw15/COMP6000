import './searchPageStyleSheet.css';
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

    const handleSort = (sortBy) => {
        const sortedResults = [...searchResults].sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
        setSearchResults(sortedResults);
    };
    
    
    return (
        <>
            <HeaderBar />
            <div className="searchPage">
                <br />
                <br />
                <div className="searchPageHeader"> Search </div>
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
                    <div class="searchPageDropDown">
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
                            <table className="searchPageResults">
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
                        <button id="backToHome" className="searchPageButton">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SearchPage;
