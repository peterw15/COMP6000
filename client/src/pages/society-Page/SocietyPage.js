
import { Link } from "react-router-dom";
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
import background from "../../brandMaterial/background.png";
import Image from 'react-bootstrap/Image';



function SocietyPage() {

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if (res.data == null) {
                navigate("/login");
            }
            else {
                getSociety();
            }
        });
    }, [])

    function getSociety(SocietyID) {
        Axios.post('http://localhost:3001/getSociety', {SocietyID}).then()
    }

    const [societyName, setSocietyName] = useState("");
    const [listState, setListState] = useState([]);

    return (
        <html className="eventHtml" style={{ backgroundImage: `url(${background})`, minHeight: "1080px", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", fontFamily: "roboto" }}>
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/>  
            <HeaderBar></HeaderBar>
            <Container className="mainContainer">
                <Row style={{marginTop:"150px", justifyContent: "center"}}>
                <Col style={{width:"33%",textAlign:"center"}}><Image src={background} style={{width:"200px",height: "200px" }}roundedCircle></Image></Col>
                <Col style={{width:"33%"}}>
                    <h2 style={{color: "#ffffff",fontSize:"40px", fontFamily: "roboto", width:"50%", textAlign:"center"}}>SocietyName</h2>
                    <div style={{color: "#ffffff",fontSize:"20px", fontFamily: "roboto"}}>link here</div>
                    <div style={{color: "#ffffff",fontSize:"20px", fontFamily: "roboto"}}>some tags or something</div>
                </Col>
                <Col></Col>
                </Row>
                <Row style={{width:"90%", justifyContent: "center",marginTop: "20px",color: "#ffffff",fontSize:"20px", fontFamily: "roboto"}}>
                    description description description description description description description description description description description description
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
