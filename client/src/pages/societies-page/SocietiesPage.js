// imports
import React, { useEffect, useState } from 'react'; // react/states
import './societiesPagesStylesheet.css'; // css access
import ImgButton from './components/images/logoIcon.png'; // logo as button
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js'; // navbar
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigate

function SocietiesPage() {
    // ripple animation
    const [ripple, setRipple] = useState(false);
    const navigate = useNavigate();

    // when button is clicked
    const buttonClick = () => {
        setRipple(true);
        setTimeout(() => {
            setRipple(false);
        }, 1000);
    };

    // check user is logged in first
    useEffect(() => {
        axios.get('http://localhost:3001/loggedIn', {})
            .then(res => {
                console.log(res);
                if (res.data == null) {
                    navigate("/login");
                } else {
                    // societies stuff
                }
            })
            .catch(error => {
                console.error('Error checking loggedIn status:', error);
            });
    }, []);
    

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
            </div>
        </>
    );
}

export default SocietiesPage;
