import React from 'react';

function NameCard(props) {
    return (
        <div style={{display : 'flex', flexDirection : 'row'}}>
            <img src={props.profilePic} width='60px' height='100px'/>
            <header style={{marginTop : '40px'}}>{props.userName}</header>
        </div>
    );
}

export default NameCard;