//import './loginPageStyleSheet.css';
import { Link } from "react-router-dom";
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import library from './library.jpg';



function LoginPage() {

    const navigate = useNavigate();

    const handleClick = () => {
        Axios.post('http://localhost:3001/login', {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }).then(res => res.data.isAuthenticated ? navigate("/home",) : console.log(res)).catch(error => console.log(error));
    }

    //const isAuthenticated = (authenticated) => authenticated ? navigate("/home")  : console.log("NOT VALIDATED");

    return (
        <>  
            <Container fluid style={{height:"100vh"}}>
                <Row style={{width:"100%"}}>
                    <Col style={{width:"50%", height: "100vh", backgroundImage: `url(${library})`, backgroundSize : "cover", backgroundPosition:"center", borderRight: "solid 5px", borderColor: "#1e1e1e"}}>
                    </Col>
                    <Col style={{width:"50%", backgroundColor: "#252526"}}>
                        <Row style={{height:"20%"}}></Row>
                        <Row style={{height:"33%"}}>
                            <Container fluid>
                                <Row>
                                    <Col></Col>
                                    <Col className="text-center">
                                        <div className="header" style={{color: "#3299ff"}}>Sign In</div>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{height:"10%"}}></Row>
                                <Row>
                                    <Col></Col>
                                    <Col className="text-center">
                                        <Form.Control type="text" id="username" placeholder="Username"/>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{height:"5%"}}></Row>
                                <Row>
                                    <Col></Col>
                                    <Col className="text-center">
                                        <Form.Control type="password" id="password" placeholder="Password" />
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{height:"10%"}}></Row>
                                <Row>
                                    <Col style={{width:"33%"}}></Col>
                                    <Col style={{width:"33%"}} className="text-center">
                                        <Button variant="primary" id="submit" onClick={handleClick} style={{height: "45px", width:"30%"}}>Submit</Button>
                                    </Col>
                                    <Col style={{width:"33%"}}></Col>
                                </Row>
                                <Row style={{height:"1%"}}></Row>
                                <Row>
                                    <Col></Col>
                                    <Col className="text-center">
                                        <Button variant="primary" id="forgotPassword" className="btn" style={{height: "45px", width:"40%", marginLeft:"50%", fontSize:"80%"}}>Forgot Login</Button>
                                    </Col>
                                    <Col className="text-center">
                                        <Link to="/register" >
                                                <Button variant="primary" id="createAccount" className="btn" style={{height: "45px", width:"40%", marginRight:"50%", fontSize:"80%"}}>Create Account</Button>
                                        </Link>
                                    </Col>
                                    <Col >
                                    </Col>
                                </Row>
                                <Container>
                                    <Row></Row>
                                </Container>
                            </Container>
                        </Row>
                        <Row style={{height:"33%"}}></Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginPage
