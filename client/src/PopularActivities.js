import React from 'react';
import ActivityCard from './ActivityCard.js';

function PopularActivities(props) {

    const finalList = props.activities.map(activity =>
        <ActivityCard
        ActivityPic={activity.ActivityPic} 
        ActivityTitle={activity.ActivityTitle}
        ActivityDescription={activity.ActivityDescription}>
        </ActivityCard>);

    return (
        <div style={{}}>
            <div style={{width : '100%'}}>
            <h1 style={{}}>Popular Activities</h1>
            </div>
            <div style={{display : 'flex'}}>
            {finalList}
            </div>
        </div>
    );
}

export default PopularActivities;