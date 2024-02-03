// imports
import React, { useState } from 'react';
import './societiesPagesStylesheet.css';
import ImgButton from './components/images/logoIcon.png';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';

function SocietiesPage() {
    // ripple animation
    const [ripple, setRipple] = useState(false);

    // when button is clicked
    const buttonClick = () => {
        setRipple(true);
        setTimeout(() => {
            setRipple(false);
        }, 1000);
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
            </div>
        </>
    );
}

export default SocietiesPage;
