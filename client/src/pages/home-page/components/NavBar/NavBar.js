import React from 'react';
import NameCard from './NameCard.js';
import SearchBar from './SearchBar.js';

function Navbar(props) {
    return (
        <div style={{display: 'flex', borderBottom : '1px solid grey', width:'100%'}}>
            <NameCard profilePic={props.profilePic} userName={props.userName}></NameCard>
            <SearchBar onClick={props.onClick}></SearchBar>
        </div>
    );
}

export default Navbar;