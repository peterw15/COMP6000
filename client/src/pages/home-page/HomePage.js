import './homePageStyleSheet.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage(props) {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
      console.log(res);
      if (res.data == null) {
        navigate("/login");
      }
      else {
        getMyEvents();
      }
    });
  }, [])

  const getMyEvents = () => {
    Axios.post('http://localhost:3001/upcomingevents').then(res => {
      var eventsData = res.data.map(function (i) {
        return (
          <div style={{ border: "3px solid hsl(231, 77%, 78%)", margin: "auto", padding: "10px", width: "fit-content", height: "fit-content", justifyContent: "center" }}>
            <h1 className="eventInfoHeader">{i.eventName}</h1>
            <div className="eventInfo">{i.description}</div>
            <div className="eventInfo">Location: {i.location}</div>
            <div className="eventInfo">Date/Time: {i.eventDateTime}</div>
            <div className="eventInfo">Price: {i.price}</div>
            <br />
          </div>
        );
      });
      console.log(eventsData);
      setEvents(eventsData);
    });
  }

  return (
    <>
      <HeaderBar />
      <div class="main"> <br></br><br></br><br></br>
        <div class="nextEvent">
          <h2 class="headerText">Your Next Event!</h2>
          {events}
        </div>
      </div >
    </>
  );
}


export default HomePage
