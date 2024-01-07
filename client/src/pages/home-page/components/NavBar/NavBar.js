import React from 'react';
import { useNavigate } from 'react-router-dom';
import NameCard from './NameCard.js';
import SearchBar from './SearchBar.js';

function Navbar(props) {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex', 
            width:'100%', 
            height: '100px', 
            justifyContent: 'space-around', 
            alignItems: 'center', 
            backgroundColor: '#ffffff',
        }}>
            <NameCard profilePic={props.profilePic} userName={props.userName} style={{flexGrow: 1}}></NameCard>
            <SearchBar onClick={props.handleClick} style={{flexGrow: 1}}></SearchBar>
            <button onClick={() => navigate('/Home')} style={buttonStyle}
                onMouseOver={(e) => {e.target.style.backgroundColor = '#1A2238'; e.target.style.color = '#ffffff';}}
                onMouseOut={(e) => {e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#000000';}}
            >Home</button>
            <button onClick={() => navigate('/register')} style={buttonStyle}
                onMouseOver={(e) => {e.target.style.backgroundColor = '#1A2238'; e.target.style.color = '#ffffff';}}
                onMouseOut={(e) => {e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#000000';}}
            >Registration</button>
            <button onClick={() => navigate('/myBookings')} style={buttonStyle}
                onMouseOver={(e) => {e.target.style.backgroundColor = '#1A2238'; e.target.style.color = '#ffffff';}}
                onMouseOut={(e) => {e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#000000';}}
            >My Bookings</button>
            <button onClick={() => navigate('/SocietiesPage')} style={buttonStyle}
                onMouseOver={(e) => {e.target.style.backgroundColor = '#1A2238'; e.target.style.color = '#ffffff';}}
                onMouseOut={(e) => {e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#000000';}}
            >Societies</button>
            <button onClick={() => navigate('/myEvents')} style={buttonStyle}
                onMouseOver={(e) => {e.target.style.backgroundColor = '#1A2238'; e.target.style.color = '#ffffff';}}
                onMouseOut={(e) => {e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#000000';}}
            >Events</button>
            <button onClick={props.logout} style={buttonStyle}
                onMouseOver={(e) => {e.target.style.backgroundColor = '#1A2238'; e.target.style.color = '#ffffff';}}
                onMouseOut={(e) => {e.target.style.backgroundColor = '#ffffff'; e.target.style.color = '#000000';}}
            >Logout</button>
        </div>
    );
}

const buttonStyle = {
    flexGrow: 1, 
    padding: '10px', 
    fontSize: '1em', 
    backgroundColor: '#ffffff', 
    border: 'none', 
    cursor: 'pointer'
};



export default Navbar;