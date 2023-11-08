import React from 'react';

function ActivityCard(props) {
    return (<div style={{width: '10%', margin: '20px', border: '1px solid grey'}}>
        <div>
          <div>
            <div >
              <img src={props.ActivityPic} style={{width: '100%', height : '150px'}}/>  
              <h1>{props.ActivityTitle}</h1>
            </div>
          </div>
          <div>
            <p>{props.ActivityDescription}</p>
          </div>
        </div>
      </div>);
}

export default ActivityCard;