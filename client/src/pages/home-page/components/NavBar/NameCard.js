import React from 'react';

function NameCard(props) {
    return (
        <div style={{display : 'flex', flexDirection : 'row', alignItems: 'center'}}>
            <img src={props.profilePic} width='95px' height='95px' />
            <header style={{marginLeft: '10px', fontSize: '14px'}}>{props.userName}</header>
        </div>
    );
}

export default NameCard;