import './homePageStyleSheet.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import background from "./images/circleBackground1.png";

function HomePage(props) {

  const [event, setEvent] = useState([]);
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
          <div class="eventBox">
            <br />
            <h1>{i.eventName}</h1>
            <div>{i.description}</div>
            <div>Location: {i.location}</div>
            <div>Date/Time: {i.eventDateTime}</div>
            <div>Price: {i.price}</div>
            <br />
          </div>
        );
      });
      console.log(eventsData);
      setEvent(eventsData);
    });
  }

  return (
    <>
      <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed"  }}>
        <HeaderBar /> <br /> <br /> <br /> <br /> <br />
        <Container className="mainContainer">
          <div className="eventsHeader"> Home! </div>
          <Row classname="mainRow">{ }</Row>
          <div class="nextEvent">
            <h2 class="headerText">Your Next Event!</h2>
            {event}
          </div>
        </Container>

      </html>

    </>
  );
}


export default HomePage
