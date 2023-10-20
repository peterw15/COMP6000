import React from 'react';

function MenuItem(props) {
    return (
        <div style={{width : '10%', marginLeft : '5%', marginRight : '5%'}}>
            <h1 style={{color : 'grey'}} onClick={props.onClick}>{props.label}</h1>
        </div>
    );
}

export default MenuItem;