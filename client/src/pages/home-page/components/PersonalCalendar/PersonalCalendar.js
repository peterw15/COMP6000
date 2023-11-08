import React from 'react';
import Calendar from 'react-calendar';

function PersonalCalendar(props) {
    return (
        <div style={{borderBottom : '1px solid grey'}}>
            <div style={{width : '50%', marginLeft : '25%', marginBottom:'5%', marginTop:'5%'}}>
            <h1>Your Activities</h1>
            <Calendar></Calendar>
            </div>
        </div>
    );
}

export default PersonalCalendar;