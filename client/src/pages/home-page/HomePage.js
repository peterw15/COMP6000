import './homePageStyleSheet.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import background from "./images/circleBackground1.png";
import Card from 'react-bootstrap/Card';
import locationPin from './Icons/locationPin.png';
import calendar from './Icons/calendar.png'
import pound from './Icons/pound.png'
import avatar from './Icons/avatar.png'
import Carousel from 'react-bootstrap/Carousel';

function HomePage(props) {

  const [nextEvent, setNextEvent] = useState([]);
  const [popularEvents,setPopularEvents] = useState([]);
  const [recommendedEvent, setRecommendedEvent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
      console.log(res);
      if (res.data == null) {
        navigate("/login");
      }
      else {
        getMyEvents();
        getPopularEvents();
        getRecommendedEvent();
      }
    });
  }, [])

  const getMyEvents = () => {
    Axios.post('http://localhost:3001/upcomingevents').then(res => {
      var eventsData = res.data.map(function (i) {
        var date = new Date(i.eventDateTime);
        date = date.toDateString() + " " + date.toLocaleTimeString();
        var price = i.price;
          if (price == 0.00) {
            price = "Free";
          }
        return (
          <Card className="eventsCard" style={{marginLeft: "0px"}}>
                        <Container flex>
                            <Row className="cardRow">
                                <Col className="imgCol" lg="2">
                                    <Card.Img src={i.imageURL} className="cardImg"></Card.Img>
                                </Col>
                                <Col className="infoCol" >
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={locationPin}></img>
                                        <div className="infoLabel">{i.location}</div>
                                        <img className="cardIcon" src={calendar}></img>
                                        <div className="infoLabel">{date}</div>
                                    </Row>
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={pound}></img>
                                        <div className="infoLabel">{price}</div>
                                        <img className="cardIcon" src={avatar}></img>
                                        <div className="infoLabel">{i.firstName + " " + i.lastName}</div>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <Row className="cardTitleRow">
                                <Card.Title className="cardTitle">{i.eventName}</Card.Title>
                            </Row>
                            <br />
                        </Container>
                        <Card.Body className="cardBody">
                            <Card.Text className="cardText">{i.description}</Card.Text>
                        </Card.Body>
                    </Card>
        );
      });
      console.log(eventsData);
      setNextEvent(eventsData);
    });
  }

  const getRecommendedEvent = () => {
    Axios.post('http://localhost:3001/recommendedEventByTag').then(res => {
      var eventsData = res.data.map(function (i) {
        var date = new Date(i.eventDateTime);
        date = date.toDateString() + " " + date.toLocaleTimeString();
        var price = i.price;
          if (price == 0.00) {
            price = "Free";
          }
        return (
          <Card className="eventsCard" style={{marginLeft: "200px"}}>
                        <Container flex>
                            <Row className="cardRow">
                                <Col className="imgCol" lg="2">
                                    <Card.Img src={i.imageURL} className="cardImg"></Card.Img>
                                </Col>
                                <Col className="infoCol" >
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={locationPin}></img>
                                        <div className="infoLabel">{i.location}</div>
                                        <img className="cardIcon" src={calendar}></img>
                                        <div className="infoLabel">{date}</div>
                                    </Row>
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={pound}></img>
                                        <div className="infoLabel">{price}</div>
                                        <img className="cardIcon" src={avatar}></img>
                                        <div className="infoLabel">{i.firstName + " " + i.lastName}</div>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <Row className="cardTitleRow">
                                <Card.Title className="cardTitle">{i.eventName}</Card.Title>
                            </Row>
                            <br />
                        </Container>
                        <Card.Body className="cardBody">
                            <Card.Text className="cardText">{i.description}</Card.Text>
                        </Card.Body>
                    </Card>
        );
      });
      console.log(eventsData);
      setRecommendedEvent(eventsData);
    });
  }

  const getPopularEvents = () => {
    Axios.post('http://localhost:3001/popularEvents').then(res => {
      var eventsData = res.data.map(function (i) {
        var date = new Date(i.eventDateTime);
        date = date.toDateString() + " " + date.toLocaleTimeString();
        var price = i.price;
          if (price == 0.00) {
            price = "Free";
          }
        return (
          <Card className="eventsCard">
                        <Container flex>
                            <Row className="cardRow">
                                <Col className="imgCol" lg="2">
                                    <Card.Img src={i.imageURL} className="cardImg"></Card.Img>
                                </Col>
                                <Col className="infoCol" >
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={locationPin}></img>
                                        <div className="infoLabel">{i.location}</div>
                                        <img className="cardIcon" src={calendar}></img>
                                        <div className="infoLabel">{date}</div>
                                    </Row>
                                    <Row className="infoRow">
                                        <img className="cardIcon" src={pound}></img>
                                        <div className="infoLabel">{price}</div>
                                        <img className="cardIcon" src={avatar}></img>
                                        <div className="infoLabel">{i.firstName + " " + i.lastName}</div>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <Row className="cardTitleRow">
                                <Card.Title className="cardTitle">{i.eventName}</Card.Title>
                            </Row>
                            <br />
                        </Container>
                        <Card.Body className="cardBody">
                            <Card.Text className="cardText">{i.description}</Card.Text>
                        </Card.Body>
                    </Card>
        );
      })

      setPopularEvents(eventsData);
    
    });
  }

  return (
    <>
      <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed"  }}>
        <HeaderBar />
        <Container className="mainContainer">
          <div className="eventsHeader" style={{marginBottom: "30px", marginTop: "100px"}}> Home</div>
          <Row classname="mainRow" style={{paddingRight: "10px"}}>
            <Col style={{padding: "0px"}}>
              <Row className='justify-content-center' style={{textAlign: "center", marginLeft: "0px"}}>
                <h2 class="headerText">Your Next Event</h2>
                <br /> <br /> <br />
              </Row>
              {nextEvent}
            </Col>
            <Col style={{padding: "0px"}}>
            <Row className='justify-content-center' style={{textAlign: "center"}}>
                <h2 class="headerText">Recommended For You</h2>
                <br /> <br /> <br />
              </Row>
              {recommendedEvent}
            </Col>
          </Row>
          <Row classname="mainRow">
            <Row className='justify-content-center' style={{textAlign: "center"}}>
              <h2 style={{color: "#ffffff"}}>Popular Events</h2>
              <br /> <br /> <br />
            </Row>
            <br />
            <Carousel className='justify-content-center'>
              {popularEvents.map(event => 
                <Carousel.Item className='justify-content-center'>
                  <Row className='justify-content-center'>
                  {event}
                  <br />
                  </Row>
                </Carousel.Item>
              )}
            </Carousel>
          </Row>
        </Container>

      </html>

    </>
  );
}


export default HomePage
