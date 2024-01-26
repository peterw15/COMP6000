//import './registrationPageStyleSheet.css';
import {useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RegistrationPage() {

    const navigate = useNavigate();
    
    
    const registerUser = async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName').value; 
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;

        try {
            // send request to server///
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, firstName, lastName, email }),
            });

            if (response.ok) {
                console.log('User registered successfully'); // successful msg
                navigate("/login");
            } else {
                console.error('Error registering user'); // error msg
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const tags = ['Academic', 'Arts', 'Drinking', 'Mindfulness', 'Music', 'Off Campus', 'On Campus',
    'Outdoors', 'Science', 'Social', 'Sports', ];

    return (
        <html style={{height:"2000px", width:"100%"}}>
            <body style={{height:"100%", width:"100%", backgroundColor : "blue"}}>
                <Container fluid style={{height:"90%", width: "100%", backgroundColor:"black", margin:"0"}}>
                    <Row style={{width:"100%",height: "100%", margin:"0"}}>
                        <Col></Col>
                        <Col>
                            <Form style={{width:"100%",height: "100%"}}>
                                <div className="registrationPage">
                                    <div className="header"> Register </div>
                                    <div className="form">
                                        <h2 className="subHeader"> Username </h2>
                                        <input id="username" />
                                        <h2 className="subHeader"> Password</h2>
                                        <input id="password" type="password" /> <br />
                                        <h2 className="subHeader"> First Name </h2>
                                        <input id="firstName" /> 
                                        <h2 className="subHeader"> Last Name </h2>
                                        <input id="lastName" />
                                        <h2 className="subHeader"> Email </h2>
                                        <input id="email" />
                                        <h2 className="subHeader"> Please Select Up to 5 Interests: </h2>
                                        <Container fluid>
                                            <Row style={{width:"100%",height: "100%", margin:"0"}}>
                                                <Col></Col>
                                                <Col>
                                                    {
                                                        tags.map((tag) => (
                                                            <div style={{width:"200px"}}>
                                                            <Form.Check
                                                                type="checkbox"
                                                                id={`${tag}`}
                                                                label={`${tag}`}
                                                            />
                                                            <br />
                                                            </div>
                                                        ))
                                                    }
                                                </Col>
                                                <Col></Col>
                                            </Row>
                                        </Container>
                                        <button id="submit" className="btn" onClick={registerUser}> Submit </button> <br /> <br /> <br />
                                        <Link to="/login" >
                                            <button id="loginInsteadBtn" className="btn"> Login Instead </button>
                                        </Link>

                                    </div>
                                </div>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </body>
        </html>
    );
}

export default RegistrationPage;
