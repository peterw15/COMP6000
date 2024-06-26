import './registrationPageStyleSheet.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { ListGroup } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import background from './background3.png';

var index = 0;
var finalTags = [];

function RegistrationPage() {

    const navigate = useNavigate();

    const toLogin =  () => {
        navigate("/login")
    }


    var checkedBoxes = 0;

    function onCheckboxChange(event) {
        const target = event.target;
        const label = target.id;
        console.log(label);
        var add = false;
        if(checkState[label] == false) {
            console.log("YES");
            checkState[label] = true;
            checkedBoxes++;
            console.log(checkedBoxes);
        }
        else if(checkState[label] == true){
            checkState[label] = false;
            checkedBoxes--;
            console.log(checkedBoxes);
        }

        if(checkedBoxes == 5) {
            disableChecks();
        }
        else if(checkedBoxes == 4) {
            enableChecks();
        }
        
    }

    function disableChecks() {
        for(let i=0;i<tags.length;i++) {
            const element = document.getElementById(tags[i]);
            if(!checkState[element.id]) {
                element.disabled = true;
            }
        }
    }

    function enableChecks() {
        for(let i=0;i<tags.length;i++) {
            const element = document.getElementById(tags[i]);
            if(element.disabled) {
                element.disabled = false;
            }
        }
    }

    function gatherTags() {
        const trueTags = [];
        for(let i=0;i<tags.length;i++) {
            const element = document.getElementById(tags[i]);
            if(checkState[element.id]) {
                trueTags.push(tags[i]);
            }
        }
        return trueTags;
    }

    const tags = ['Academic', 'Arts', 'Drinking', 'Mindfulness', 'Music', 'Off_Campus', 'On_Campus',
        'Outdoors', 'Science', 'Social', 'Sports'];

    var checkState = {Academic : false , Arts : false, Drinking : false, Mindfulness : false, Music : false, Off_Campus : false, On_Campus : false,
    Outdoors : false, Science : false, Social : false, Sports : false};

   function registerUser () {
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('userPassword').value;
        const firstName = document.getElementById('userFirstName').value;
        const lastName = document.getElementById('userLastName').value;
        const email = document.getElementById('userEmail').value;

            Axios.post('http://localhost:3001/register', { username, password, firstName, lastName, email}).then(res => 
                res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error)).then(
            Axios.post('http://localhost:3001/getUserID', {username}).then(res => {

                console.log(res);
                
                const UserID = res.data[0].UserID;

                console.log(finalTags.length);

                for(let i=0;i<finalTags.length;i++) {
                    const tag = finalTags[i];
                    Axios.post('http://localhost:3001/addUserTag', {UserID,tag}).catch(error => console.log(error)).then(res =>
                        res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error));
                }

                navigate("/login");
            }));
    }

   

    const ref = useRef(0);

    const [username,setUsername] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [interests,setInterests] = useState([]);

    function summaryFunction() {
        setUsername(document.getElementById("username").value);
        setFirstName(document.getElementById("userFirstName").value);
        setLastName(document.getElementById("userLastName").value);
        setEmail(document.getElementById("userEmail").value);
        finalTags = gatherTags();
        setInterests(finalTags.map((tag) => tag + " | "));
    }

    const [openStart,setOpenStart] = useState(true);
    const [open1,setOpen1] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [open3,setOpen3] = useState(false);
    const [open4,setOpen4] = useState(false);
    const [open5,setOpen5] = useState(false);
    const [open6,setOpen6] = useState(false);
    const [open7,setOpen7] = useState(false);

    const [buttonLabel, setButtonLabel] = useState("Begin");
    const [buttonSubmit, setButtonSubmit] = useState(false);

    function buttonHandler () {
        if(!buttonSubmit) {
            formAnim();
        } 
        else if(buttonSubmit) {
            registerUser();
        }
    }


    function formAnim() {
        switch(index) {
            case 0:
                setOpenStart(false);
                setOpen1(true);
                setButtonLabel("Next");
                index++;
                break;
            case 1:
                setOpen2(true);
                index++;
                break;
            case 2:
                setOpen3(true);
                index++;
                break;
            case 3:
                setOpen4(true);
                index++;
                window. scrollTo({ top: 200, left: 0, behavior: 'smooth' })
                break;
            case 4:
                setOpen5(true);
                index++;
                window. scrollTo({ top: 400, left: 0, behavior: 'smooth' })
                break;
            case 5:
                setOpen6(true);
                index++;
                window. scrollTo({ top: 800, left: 0, behavior: 'smooth' })
                break;
            case 6:
                summaryFunction();
                setOpen7(true);
                index++;
                window. scrollTo({ top: 2200, left: 0, behavior: 'smooth' })
                setButtonLabel("Create Account");
                setButtonSubmit(true);
                break;
            

        }

    }
  
 

    return (
            <>
            <html style={{height:"2200px", backgroundImage: `url(${background})`,  backgroundSize : "cover", backgroundPosition:"center", backgroundAttachment: "fixed" }} className='justify-content-center'>

                <Row style={{width:"100%", height: "100%"}} className='justify-content-center'>
                <Row style={{width:"80%", height: "100%"}} className="createEventbackground">
                <Container fluid style={{height:"98%", width: "100%", marginTop:"2%"}} className="createEventFormContainer">
                        <Row style={{width:"100%",height: "100%", margin:"0", backgroundColor: "#202020"}} className="text-center">
                            <Col style={{width:"100%", height :"100%", margin:"0"}} className="createEventCol">
                                <Container fluid style={{marginTop: "2%", width:"100%"}} className="createEventFormContainer">
                                             <Collapse in={openStart}>
                                                <Container fluid style={{width:"100%", height:"100%"}} className="formContainer">
                                                        <Row className="text-center" style={{height:"100%"}}>
                                                            
                                                            <Col>
                                                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                                            </Col>
                                                            
                                                        </Row>
                                                    </Container>
                                            </Collapse>
                                                <h2 className="createEventHeader" style={{fontSize:"70px", margin:"0"}}>Create an Account</h2>
                                            </Container>
                                            <br />
                                            <Collapse in={open1}>
                                                <Container fluid style={{width:"100%"}} className="formContainer">
                                                    <Row className="text-center" style={{height:"100%"}}>
                                                        <Col style={{width:"33%"}} className="createEventCol"></Col>
                                                        <Col className="createEventFormCol">
                                                            <br />
                                                            <h2 className="createEventFormLabel">Please choose a username</h2>
                                                            <Row className='justify-content-center'><Form.Control type="text" id="username" style={{marginTop:"5%",width:"50%"}} className='eventInput'/></Row> <br />
                                                        </Col>
                                                        <Col style={{width:"33%"}} className="createEventCol"></Col>
                                                    </Row>
                                                </Container>
                                            </Collapse>
                                            <Collapse in={open2}>
                                                <Container fluid  className="text-center" style={{backgroundColor:"#202020", width:"100%"}}>
                                                        <Row className="text-center" styke={{height:"100%"}}>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                            <Col className="createEventFormCol">
                                                                <br />
                                                                <h2 className="createEventFormLabel">Please choose a password</h2>
                                                                <Row className='justify-content-center'>
                                                                    <Form.Control id="userPassword" type="password" style={{marginTop:"5%",width:"50%"}} className='eventInput'/></Row><br />
                                                            </Col>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                        </Row>
                                                </Container>
                                            </Collapse>
                                            <Collapse in={open3}>
                                                <Container fluid className="text-center" style={{backgroundColor:"#202020", width:"100%"}}>
                                                    <Row className="text-center" styke={{height:"100%"}}>
                                                        <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                        <Col className="createEventFormCol">
                                                            <br />
                                                            <h2 className="createEventFormLabel">What is your first name?</h2>
                                                            <Row className='justify-content-center'><Form.Control id="userFirstName" style={{marginTop:"5%",width:"50%"}} className='eventInput'/></Row> <br />
                                                        </Col>
                                                        <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                    </Row>
                                                </Container>
                                            </Collapse>
                                            <Collapse in={open4}>
                                                <Container fluid className="text-center" style={{backgroundColor:"#202020", width:"100%"}}>
                                                        <Row className="text-center" styke={{height:"100%"}}>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                            <Col className="createEventFormCol">
                                                                <br />
                                                                <h2 className="createEventFormLabel">What is your last name?</h2>
                                                                <Row className='justify-content-center'><Form.Control id="userLastName" style={{marginTop:"5%",width:"50%"}} className='eventInput'  /></Row> <br />
                                                            </Col>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                        </Row>
                                                </Container>
                                            </Collapse>
                                            <Collapse in={open5} fluid className="text-center">
                                                <Container fluid className="text-center" style={{backgroundColor:"#202020", width:"100%"}}>
                                                        <Row className="text-center" styke={{height:"100%"}}>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                            <Col className="createEventFormCol">
                                                                <br />
                                                                <h2 className="createEventFormLabel">Please provide an email address</h2>
                                                                <Row className='justify-content-center'><Form.Control id="userEmail" style={{marginTop:"5%",width:"50%"}} className='eventInput' /></Row> <br />
                                                            </Col>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                        </Row>
                                                </Container>
                                            </Collapse>
                                            <Collapse in={open6} fluid className="text-center">
                                                <Container fluid className="text-center" style={{width:"100%"}}>
                                                    <Row className="text-center" styke={{height:"100%"}}>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                            <Col className="createEventFormCol">
                                                                <br />
                                                                <h2 className="createEventFormLabel"> Please Select Up to 5 Interests: </h2>
                                                                <br/>
                                                                <Row style={{width:"100%",height: "100%", margin:"0"}}>
                                                                    <Col></Col>
                                                                    <Col>
                                                                        {
                                                                            tags.map((tag) => (
                                                                                <Row style={{width:"100%"}}>
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    id={`${tag}`}
                                                                                    label={`${tag}`}
                                                                                    onChange={onCheckboxChange}
                                                                                    style={{color:"#18cdc6"}}
                                                                                />
                                                                                <br />
                                                                                </Row>
                                                                            ))
                                                                        }
                                                                    <br/>
                                                                    </Col>
                                                                    <Col></Col>
                                                                </Row>
                                                            </Col>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>   
                                                    </Row>
                                                </Container>
                                            </Collapse>
                                            <Collapse in={open7} fluid className="text-center">
                                                <Container fluid className="text-center" style={{width:"100%"}}>
                                                        <Row className="text-center">
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                            <Col className="createEventFormCol">
                                                                <br />
                                                                <h2 className = "createEventFormLabel">Summary</h2>
                                                                <Row className='justify-content-center'>
                                                                    <ListGroup style={{width:"50%"}}>
                                                                        <ListGroup.Item className='eventInput'>Username: {username}</ListGroup.Item>
                                                                        <ListGroup.Item className='eventInput'>First Name: {firstName}</ListGroup.Item>
                                                                        <ListGroup.Item className='eventInput'>Last Name: {lastName}</ListGroup.Item>
                                                                        <ListGroup.Item className='eventInput'>Email Address: {email}</ListGroup.Item>
                                                                        <ListGroup.Item className='eventInput'>Interests: {interests}</ListGroup.Item>
                                                                    </ListGroup>
                                                                </Row>
                                                                <br/>
                                                            </Col>
                                                            <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                        </Row>
                                                </Container>
                                            </Collapse>     
                                            <Container fluid  className="text-center" style={{width:"100%"}}>
                                                <Row className="text-center" style={{height:"100%"}}>
                                                    <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                    <Col style={{width:"33%", height:"100%"}} className='justify-content-center'>
                                                        <br/>
                                                            <Button variant="outline-primary" id="formButton" className="formButton" onClick={buttonHandler} style={{backgroundColor:"#252526", width: "50%",color:"#ffffff", fontSize:"90%", borderColor :"#18cdc6"}}>{buttonLabel}</Button>
                                                            <br />
                                                            <Button variant="outline-primary" id="formButton" className="formButton" onClick={toLogin} style={{backgroundColor:"#252526", width: "25%",color:"#ffffff", fontSize:"90%", borderColor :"#18cdc6"}}>Cancel</Button>
                                                    </Col>
                                                    <Col style={{width:"33%"}}className="createEventCol"></Col>
                                                </Row>
                                        </Container>               
                            </Col>
                        </Row>
                        
                </Container>
                </Row>
                </Row>
                
                </html>
            </>
    );
}

export default RegistrationPage;
