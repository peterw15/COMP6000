
import "./societyPageStyleSheet.css";
import { Link, useSearchParams } from "react-router-dom";
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import background from "./Images/circleBackground1.png";
import basketball from "./Images/basketball.png";
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import locationPin from './Icons/locationPin.png';
import calendar from './Icons/calendar.png'
import pound from './Icons/pound.png'
import avatar from './Icons/avatar.png'
import Modal from 'react-bootstrap/Modal';

function SocietyPage() {

    const navigate = useNavigate();

    const [queryParameters] = useSearchParams();

    const [isPresident,setIsPresident] = useState(false);
    const [inSociety, setInSociety] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const paramID = queryParameters.get('id');


    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if (res.data == null) {
                navigate("/login");
            }
            else {
                isInSociety(paramID);
                getSociety(paramID);
                getEvents(paramID);
                getMembers(paramID);
                getAnnouncements(paramID);
            }
        })
    }, [])

    function isInSociety(SocietyID) {
        Axios.post('http://localhost:3001/isInSociety', {SocietyID}).then(res => {
            const result = res.data;
            if(!result) {
                setButtonState(<Button className="joinSocietyButton" onClick={joinSociety}>Join Society</Button>);
                setInSociety(false);
            }
            else {
                setButtonState(<div style={{color:"#ffffff", borderTop:"1px solid #18cdc6",paddingTop:"20px",fontSize:"20px"}}>You are a member of this society</div>);
                setInSociety(true);
                Axios.post('http://localhost:3001/isSocietyPresident', {SocietyID}).then(res => {
                    const isPresident = res.data;
                    if(isPresident) {
                        setAnnounceButtonState(<Button className="joinSocietyButton" style={{width:"60%", height:"40px"}}onClick={handleShow}>Create Announcement</Button>)
                        setIsPresident(true);
                    }
                    else {
                        setAnnounceButtonState("");
                        setIsPresident(false);
                    }
                });
            }
        })
    }

    function getSociety(SocietyID) {
        Axios.post('http://localhost:3001/getSocietyInfo', {SocietyID}).then(res => {
            const result = res.data[0];
            setSocietyName(result.socName);
            setSocietyPresident(result.firstName + " " + result.lastName);
            setSocietyLink(result.socLink);
            setSocietyLocation(result.socLocation);
            setSocietyPrice(result.socPrice);
            setSocietyDescription(result.socDescription);

            
        }) 
    }

    function getEvents(SocietyID) {
        Axios.post('http://localhost:3001/getSocietyEvents', {SocietyID}).then(res => {
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
              setUpcomingEvents(eventsData);
        })
    }

    function getMembers(SocietyID) {
        Axios.post('http://localhost:3001/getSocietyMembers', {SocietyID}).then(res => {
            var memberData = res.data.map(function (i) {
                return(
                    <ListGroup.Item className="memberListItem">{i.firstName + " " + i.lastName}</ListGroup.Item>
                )
            })
            setMembers(memberData);
        })

    }

    function getAnnouncements(SocietyID) {
        Axios.post('http://localhost:3001/getSocietyAnnouncements', {SocietyID}).then(res => {
            var announcementData = res.data.map(function (i) {
                var date = new Date(i.announcementDateTime);
                date = date.toDateString() + " " + date.toLocaleTimeString();
                return(
                    <ListGroup.Item className="memberListItem" style={{width:"90%", marginBottom: "5px",textAlign:"left"}}>{date + " - " + i.announcement}</ListGroup.Item>
                )
            })
            setAnnouncements(announcementData);
        })

    }

    function joinSociety() {
        const SocietyID = paramID;
        Axios.post('http://localhost:3001/joinSociety', {SocietyID}).then(res => {
            const result = res.data;
            if(result) {
                setButtonState(<div style={{color:"#ffffff", borderTop:"1px solid #18cdc6",paddingTop:"20px",fontSize:"20px"}}>Successfully Joined Society</div>);
            }
            else {
                setButtonState(<div style={{color:"red", borderTop:"1px solid #18cdc6",paddingTop:"20px",fontSize:"20px"}}>Your are already a member of this society</div>);
            }
        })
    }

    function createAnnouncement() {
        const SocietyID = paramID;
        const announcement = document.getElementById('newAnnouncement').value;
        console.log(announcement);
        Axios.post('http://localhost:3001/createSocietyAnnouncement', {SocietyID,announcement}).then(res => {
            const result = res.data;
            console.log(result);
            if(result) {
                setCreateAnnouncementMessage(<div style={{color:"#ffffff", borderTop:"1px solid #18cdc6",paddingTop:"20px",fontSize:"20px"}}>Successfully Created Announcement</div>);
            }
            else {
                setCreateAnnouncementMessage(<div style={{color:"#ffffff", borderTop:"1px solid #18cdc6",paddingTop:"20px",fontSize:"20px"}}>Error Creating Anouncement: Please Try Again</div>);
            }
        })

    }


    const [societyName, setSocietyName] = useState("");
    const [societyLocation, setSocietyLocation] = useState("");
    const [societyPresident, setSocietyPresident] = useState("");
    const [societyLink, setSocietyLink] = useState("");
    const [societyDescription, setSocietyDescription] = useState("");
    const [societyPrice, setSocietyPrice] = useState("");
    const [upcomingEvents, setUpcomingEvents] = useState([]);
   
    const [members, setMembers] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [createAnnouncementMessage, setCreateAnnouncementMessage] = useState(<Button onClick={createAnnouncement} style={{width:"200px",height:"50px",backgroundColor:"#202020",borderColor:"#18cdc6"}}>Create Announcement</Button>);

    const [buttonState, setButtonState] = useState([]);
    const [announceButtonState,setAnnounceButtonState] = useState([]);

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, width:"100vw",height:"100vh",maxHeight: "100vh", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", fontFamily: "roboto" }}>
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/>  
            <HeaderBar></HeaderBar>
            <Container fluid style={{marginLeft:"10%", marginRight:"10%",backgroundColor: "rgba(37, 37, 38, 0.7)", maxHeight: "100vh", textAlign: "center", justifyContent: "center"}}>
            <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton style={{backgroundColor:"#202020"}}>
                        <Modal.Title style={{color: "#ffffff"}}>Create an Announcement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:"#202020"}}>
                        <form>
                            <label for="AnnouncementLabel" style={{color: "#ffffff"}}>Announcement:</label>
                            <input type="text" class="form-control" id="newAnnouncement" style={{color: "#ffffff",backgroundColor:"#252526",borderColor:"#18cdc6"}}/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor:"#202020",paddingRight:"0px"}}>
                        <Row>{createAnnouncementMessage}</Row>
                    </Modal.Footer>
                </Modal >
                <Row style={{marginTop:"100px", justifyContent: "center", alignItems: "center"}}>
                <Col sm={3} style={{marginLeft: "20px",paddingTop: "40px",height:"800px",textAlign:"center",justifyContent: "center", alignItems: "center", backgroundColor:"#202020"}}>
                    <Row style={{alignItems: "center", justifyContent: "center"}}><Image src={basketball} style={{width:"150px"}}roundedCircle></Image></Row>
                    <br />
                    <Row className="societyRow"><h2 className="societyHeader">{societyName}</h2></Row>
                    <Row style={{alignItems: "flex-start", justifyContent: "left"}}><a href={societyLink} className="societyLabel">{societyLink}</a></Row>
                    <Row className="societyRow"><div className="societyLabel">{societyLocation}</div></Row>
                    <Row className="societyRow"><div className="societyLabel">{societyPresident}</div></Row>
                    <Row className="societyRow"><div className="societyLabel">some tags or something</div></Row>
                    <Row style={{height:"40%",width: "90%",justifyContent: "center",alignItems: "center",marginTop: "20px",marginLeft:"5%",marginRight:"5%",color: "#ffffff",fontSize:"20px", fontFamily: "roboto", backgroundColor:"#18cdc6"}}>
                        <div className="societyLabel" style={{fontSize: "18px", color: "#252526"}}>{societyDescription}</div>
                    </Row>
                    <Row style={{height:"8%",width: "90%",justifyContent: "center",alignItems: "center",marginTop: "20px",marginLeft:"5%",marginRight:"5%",color: "#ffffff",fontSize:"20px"}}>
                        {buttonState}
                    </Row>
                </Col>
                <Col sm={6} style={{marginLeft: "20px",height:"800px",textAlign:"center",justifyContent: "center", alignItems: "center", backgroundColor:"#252526"}}>
                    <Row style={{justifyContent: "center", backgroundColor:"#202020", height:"10%", paddingTop: "15px"}}><h2 className="societyHeader">Anouncements</h2></Row>
                    <Row style={{justifyContent: "center", backgroundColor:"#202020", height:"22%", paddingTop: "15px"}}>
                        <ListGroup className="societyMemberList" style={{overflowY: "scroll", height:"98%",maxheight:"98%",alignItems:"center"}}>
                            {announcements}
                        </ListGroup>
                    </Row>
                    <Row style={{justifyContent: "center", backgroundColor:"#202020", height:"10%", paddingTop: "15px"}}>
                        {announceButtonState}
                    </Row>
                    <br />
                    <Row style={{justifyContent: "center", backgroundColor:"#202020", height:"10%",paddingTop: "15px"}}><h2 className="societyHeader">Upcoming Events</h2></Row>
                    <Row style={{justifyContent: "center", backgroundColor:"#202020", height:"45%",paddingTop: "15px"}}>
                    <Carousel  style={{width:"100%", height:"100%",textAlign:"left"}}>
                        {upcomingEvents.map(event => 
                            <Carousel.Item className='justify-content-center'>
                            <Row className='justify-content-center' style={{paddingRight:"35px"}}>
                            {event}
                            <br />
                            </Row>
                            </Carousel.Item>
                        )}
                    </Carousel>
                    </Row>
                </Col>
                <Col sm={2} style={{marginLeft: "20px",height:"800px",textAlign:"center",justifyContent: "center", alignItems: "center", backgroundColor:"#202020"}}>
                    <Row style={{alignItems: "center", justifyContent: "center",paddingTop: "15px"}}><h2 className="societyHeader">Members</h2></Row>
                    <Row style={{justifyContent: "center",paddingTop: "15px", height: "90%", paddingLeft:"15px",paddingRight:"15px"}}>
                        <ListGroup className="societyMemberList" style={{overflowY: "scroll", height:"98%",maxheight:"98%"}}>
                            {members}
                        </ListGroup>
                    </Row>
                </Col>
                </Row>
                <Container>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>        
                </Container>
            </Container>
        </html>
    );
}

export default SocietyPage
