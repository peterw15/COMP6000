
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



function SocietyPage() {

    const navigate = useNavigate();

    const [queryParameters] = useSearchParams();


    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if (res.data == null) {
                navigate("/login");
            }
            else {
                getSociety(queryParameters.get('id'));
            }
        });
    }, [])

    function getSociety(SocietyID) {
        Axios.post('http://localhost:3001/getSocietyInfo', {SocietyID}).then(res => {
            const result = res.data[0];
            console.log(result);
            setSocietyName(result.socName);
            setSocietyPresident(result.socPresident);
            setSocietyLink(result.socLink);
            setSocietyLocation(result.socLocation);
            setSocietyPrice(result.socPrice);
            setSocietyDescription(result.socDescription);

            
        }) 
    }

    const [societyName, setSocietyName] = useState("");
    const [societyLocation, setSocietyLocation] = useState("");
    const [societyPresident, setSocietyPresident] = useState("");
    const [societyLink, setSocietyLink] = useState("");
    const [societyDescription, setSocietyDescription] = useState("");
    const [societyPrice, setSocietyPrice] = useState("");
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, width:"100vw",minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", fontFamily: "roboto" }}>
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/>  
            <HeaderBar></HeaderBar>
            <Container fluid style={{marginLeft:"10%", marginRight:"10%",backgroundColor:"#252526", textAlign: "center", justifyContent: "center"}}>
                <Row style={{marginTop:"100px", justifyContent: "center", alignItems: "center"}}>
                <Col sm={3} style={{marginLeft: "20px",paddingTop: "40px",height:"800px",textAlign:"center",justifyContent: "center", alignItems: "center", backgroundColor:"#202020"}}>
                    <Row style={{alignItems: "center", justifyContent: "center"}}><Image src={basketball} style={{width:"150px"}}roundedCircle></Image></Row>
                    <br />
                    <Row style={{alignItems: "center", justifyContent: "center"}}><h2 className="societyHeader">{societyName}</h2></Row>
                    <Row style={{alignItems: "flex-start", justifyContent: "left"}}><div className="societyLabel">{societyLink}</div></Row>
                    <Row style={{alignItems: "center", justifyContent: "center"}}><div className="societyLabel">{societyLocation}</div></Row>
                    <Row style={{alignItems: "center", justifyContent: "center"}}><div className="societyLabel">{societyPresident}</div></Row>
                    <Row style={{alignItems: "center", justifyContent: "center"}}><div className="societyLabel">some tags or something</div></Row>
                    <Row style={{height:"40%",width: "90%",justifyContent: "center",alignItems: "center",marginTop: "20px",marginLeft:"5%",marginRight:"5%",color: "#ffffff",fontSize:"20px", fontFamily: "roboto", backgroundColor:"#18cdc6"}}>
                        <div className="societyLabel" style={{fontSize: "18px"}}>{societyDescription}</div>
                    </Row>
                    <Row style={{height:"8%",width: "90%",justifyContent: "center",alignItems: "center",marginTop: "20px",marginLeft:"5%",marginRight:"5%",color: "#ffffff",fontSize:"20px"}}>
                        <Button className="joinSocietyButton">Join Society</Button>
                    </Row>
                </Col>
                <Col sm={6} style={{marginLeft: "20px",height:"800px",textAlign:"center",justifyContent: "center", alignItems: "center", backgroundColor:"#252526"}}>
                    <Row style={{justifyContent: "center", backgroundColor:"#202020", height:"37%", paddingTop: "15px"}}><h2 className="societyHeader">Anouncements</h2></Row>
                    <br />
                    <Row style={{justifyContent: "center", backgroundColor:"#202020", height:"60%",paddingTop: "15px"}}><h2 className="societyHeader">Upcoming Events</h2></Row>
                    <Carousel className='justify-content-center'>
                        {upcomingEvents.map(event => 
                            <Carousel.Item className='justify-content-center'>
                            <Row className='justify-content-center' style={{paddingRight:"35px"}}>
                            {event}
                            <br />
                            </Row>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </Col>
                <Col sm={2} style={{marginLeft: "20px",height:"800px",textAlign:"center",justifyContent: "center", alignItems: "center", backgroundColor:"#202020"}}>
                    <Row style={{alignItems: "center", justifyContent: "center",paddingTop: "15px"}}><h2 className="societyHeader">Members</h2></Row>
                    <Row style={{justifyContent: "center",paddingTop: "15px", height: "90%", paddingLeft:"15px",paddingRight:"15px"}}>
                        <ListGroup className="societyMemberList" style={{overflowY: "scroll", height:"98%",maxheight:"98%"}}>
                            <ListGroup.Item className="memberListItem">test1</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
                            <ListGroup.Item className="memberListItem">test</ListGroup.Item>
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
