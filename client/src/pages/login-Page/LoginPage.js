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
import background from './background2.png';
import logo from './logoAbove.png';
import { FloatingLabel } from "react-bootstrap";



function LoginPage() {

    const navigate = useNavigate();

    const handleClick = () => {
        const errorMessage = document.getElementById("errorMessage");
        Axios.post('http://localhost:3001/login', {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }).then(res => res.data.isAuthenticated ? navigate("/home",) : errorMessage.hidden = false).catch(error => console.log(error));
    }

    //const isAuthenticated = (authenticated) => authenticated ? navigate("/home")  : console.log("NOT VALIDATED");

    return (
        <>
            <Container fluid style={{ height: "100vh", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }} className="text-center">
                <Row style={{ width: "100%" }} className="text-center">
                    <Col style={{ width: "33.33%", height: "100vh" }}>
                    </Col>
                    <Col style={{ width: "33.33%", marginTop: "50px", marginBottom: "50px", marginLeft: "20px" }} className="text-center" >
                        <Row style={{ height: "15%" }}>
                        </Row>
                        <Row style={{ height: "33%" }} className="text-center">
                            <img src={logo} ></img>
                            <Container fluid style={{ backgroundColor: "#202020" }}>
                                <Row>
                                    <Col></Col>
                                    <Col className="text-center">
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{ height: "10%" }}></Row>
                                <Row>
                                    <Col style={{ width: "33.33%" }}></Col>
                                    <Col className="text-center" style={{ width: "33.33%", backgroundColor: "#202020" }}>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Username"
                                            className="mb-1"
                                        >
                                            <Form.Control type="text" id="username" placeholder="Username" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col style={{ width: "33.33%" }}></Col>
                                </Row>
                                <Row style={{ height: "5%" }}></Row>
                                <Row>
                                    <Col></Col>
                                    <Col className="text-center">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Password"
                                            className="mb-1"
                                        >
                                            <Form.Control type="password" id="password" placeholder="Password" />
                                        </FloatingLabel>
                                        <div id="errorMessage" hidden="true" style={{ color: "#ee4949", marginTop: "10px" }}>Invalid Username/Password</div>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{ height: "10%" }}></Row>
                                <Row>
                                    <Col style={{ width: "33%" }}></Col>
                                    <Col style={{ width: "33%" }} className="text-center">
                                        <Button variant="outline-primary" id="submit" className="btn" onClick={handleClick} style={{ height: "45px", width: "150px", backgroundColor: "#252526", color: "#ffffff", fontSize: "100%", borderColor: "#18cdc6" }}>Login</Button>
                                    </Col>
                                    <Col style={{ width: "33%" }}></Col>
                                </Row>
                                <Row style={{ height: "1%" }}></Row>
                                <Row className="text-center">
                                    <Col></Col>
                                    <Col className="text-center">
                                        <Button variant="outline-primary" id="forgotPassword" className="btn" style={{ height: "45px", width: "100px", fontSize: "80%", backgroundColor: "#252526", color: "#ffffff", borderColor: "#18cdc6" }}>Forgot Login</Button>
                                    </Col>
                                    <Col className="text-center">
                                        <Link to="/register" >
                                            <Button variant="outline-primary" id="createAccount" className="btn" style={{ height: "45px", width: "100px", marginRight: "50%", fontSize: "80%", backgroundColor: "#252526", color: "#ffffff", borderColor: "#18cdc6" }}>Sign Up</Button>
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
                        <Row style={{ height: "33.33%" }}></Row>
                    </Col>
                    <Col style={{ width: "33.33%", height: "100vh" }}></Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginPage
