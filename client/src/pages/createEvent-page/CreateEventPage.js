import './createEventPageStylesheet.css';
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
import background from './background.png';

var index = 0;

function CreateEventPage() {

    const navigate = useNavigate();


    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if (res.data == null) {
                navigate("/login");
            }
            else {

            }
        });
    })

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

    const checkState = {Academic : false , Arts : false, Drinking : false, Mindfulness : false, Music : false, Off_Campus : false, On_Campus : false,
    Outdoors : false, Science : false, Social : false, Sports : false};

    function createEvent () {

        const finalTags = gatherTags();

        const eventName = document.getElementById('eventName').value;
        const eventDateTime = document.getElementById('eventDateTime').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);

            Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            const organiser = parseInt(res.data);
            Axios.post('http://localhost:3001/createEvent', { eventName, eventDateTime, location, description, organiser, price }).then(res => 
                res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error)).then(
            Axios.post('http://localhost:3001/getEventID', { eventName, eventDateTime, location, description, organiser, price }).then(res => {
                
                const EventID = res.data[0].EventID;

                for(let i=0;i<finalTags.length;i++) {
                    const tag = finalTags[i];
                    Axios.post('http://localhost:3001/addEventTag', {EventID,tag}).then(res =>
                        res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error));
                }
            }));
        });
    }

    const ref = useRef(0);

    const onNext = () => {
        ref.current.next();
    }

    const onPrev = () => {
        ref.current.prev();
    }

    const [eventName,setEventName] = useState("");
    const [eventDateTime,setEventDateTime] = useState("");
    const [eventLocation,setEventLocation] = useState("");
    const [eventDescription,setEventDescription] = useState("");
    const [eventPrice,setEventPrice] = useState("");
    const [eventTags,setEventTags] = useState([]);

    function summaryFunction() {
        setEventName(document.getElementById("eventName").value);
        setEventDateTime(document.getElementById("eventDateTime").value);
        setEventLocation(document.getElementById("location").value);
        setEventDescription(document.getElementById("description").value);
        setEventPrice(document.getElementById("price").value);
        setEventTags(gatherTags().map((tag) => tag + " | "));
        onNext();
    }


    const [open1,setOpen1] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [open3,setOpen3] = useState(false);
    const [open4,setOpen4] = useState(false);
    const [open5,setOpen5] = useState(false);
    const [open6,setOpen6] = useState(false);
    const [open7,setOpen7] = useState(false);

    const [buttonLabel, setButtonLabel] = useState("Begin");


    function formAnim() {
        switch(index) {
            case 0:
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
                break;
            case 4:
                setOpen5(true);
                index++;
                break;
            case 5:
                setOpen6(true);
                index++;
                break;
            case 6:
                setOpen7(true);
                index++;
                break;
            

        }

    }
  
 

    return (
            <>
            <html style={{height:"2200px", backgroundColor: "#202020"}}>
                <body>
                <HeaderBar></HeaderBar>
                <Container fluid style={{height:"100%", width: "100%", backgroundColor:"#202020", margin:"0"}}>
                        <Row style={{width:"100%",height: "100%", margin:"0"}} className="text-center">
                                        <Container fluid style={{marginTop:"3%"}}className="text-center">
                                            <h2 className="subHeader" style={{color:"#18cdc6", fontSize:"70px"}}>Let's create an event!</h2>
                                        </Container>
                                        <Collapse in={open1}>
                                            <Container fluid className="text-center">
                                                <Row className="text-center" styke={{height:"100%"}}>
                                                    <Col style={{width:"33%"}}></Col>
                                                    <Col className="formCol">
                                                        <br />
                                                        <h2 className="formLabel">What would you like your event to be called?</h2>
                                                        <Row className='justify-content-center'><Form.Control type="text" id="eventName" style={{marginTop:"5%",width:"50%"}} className='center-block'/></Row> <br />
                                                    </Col>
                                                    <Col style={{width:"33%"}}></Col>
                                                </Row>
                                            </Container>
                                        </Collapse>
                                        <Collapse in={open2}>
                                            <Container fluid  className="text-center">
                                                    <Row className="text-center" styke={{height:"100%"}}>
                                                        <Col style={{width:"33%"}}></Col>
                                                        <Col className="formCol">
                                                            <br />
                                                            <h2 className="formLabel">What is the date/time of your event?</h2>
                                                            <Row className='justify-content-center'><Form.Control id="eventDateTime" style={{marginTop:"5%",width:"50%"}} className='center-block'/></Row> <br />
                                                        </Col>
                                                        <Col style={{width:"33%"}}></Col>
                                                    </Row>
                                            </Container>
                                        </Collapse>
                                        <Collapse in={open3}>
                                            <Container fluid className="text-center">
                                                <Row className="text-center" styke={{height:"100%"}}>
                                                    <Col style={{width:"33%"}}></Col>
                                                    <Col className="formCol">
                                                        <br />
                                                        <h2 className="formLabel">Where will your event be located?</h2>
                                                        <Row className='justify-content-center'><Form.Control id="location" style={{marginTop:"5%",width:"50%"}} /></Row> <br />
                                                    </Col>
                                                    <Col style={{width:"33%"}}></Col>
                                                </Row>
                                            </Container>
                                        </Collapse>
                                        <Collapse in={open4}>
                                            <Container fluid className="text-center">
                                                    <Row className="text-center" styke={{height:"100%"}}>
                                                        <Col style={{width:"33%"}}></Col>
                                                        <Col className="formCol">
                                                            <br />
                                                            <h2 className="formLabel">How would you describe your event?</h2>
                                                            <Row className='justify-content-center'><Form.Control id="description" style={{marginTop:"5%",width:"50%"}}  /></Row> <br />
                                                        </Col>
                                                        <Col style={{width:"33%"}}></Col>
                                                    </Row>
                                            </Container>
                                        </Collapse>
                                        <Collapse in={open5}>
                                            <Container fluid className="text-center">
                                                    <Row className="text-center" styke={{height:"100%"}}>
                                                        <Col style={{width:"33%"}}></Col>
                                                        <Col className="formCol">
                                                            <br />
                                                            <h2 className="formLabel">How much will your event cost?</h2>
                                                            <Row className='justify-content-center'><Form.Control id="price" style={{marginTop:"5%",width:"50%"}} /></Row> <br />
                                                        </Col>
                                                        <Col style={{width:"33%"}}></Col>
                                                    </Row>
                                            </Container>
                                        </Collapse>
                                        <Collapse in={open6}>
                                            <Container fluid className="text-center" style={{backgroundColor:"#202020"}}>
                                                <Row className="text-center" styke={{height:"100%"}}>
                                                        <Col style={{width:"33%"}}></Col>
                                                        <Col className="formCol">
                                                            <br />
                                                            <h2 className="formLabel"> Please Select Up to 5 Tags: </h2>
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
                                                        <Col style={{width:"33%"}}></Col>   
                                                </Row>
                                            </Container>
                                        </Collapse>
                                        <Collapse in={open7}>
                                            <Container fluid className="text-center">
                                                    <Row className="text-center" style={{height:"100%"}}>
                                                        <Col style={{width:"33%"}}></Col>
                                                        <Col className="formCol">
                                                            <br />
                                                            <h2 className = "formLabel">Summary</h2>
                                                            <Row className='justify-content-center'>
                                                                <ListGroup style={{width:"50%"}}>
                                                                    <ListGroup.Item>Name: {eventName}</ListGroup.Item>
                                                                    <ListGroup.Item>Date/Time: {eventDateTime}</ListGroup.Item>
                                                                    <ListGroup.Item>Location: {eventLocation}</ListGroup.Item>
                                                                    <ListGroup.Item>Description: {eventDescription}</ListGroup.Item>
                                                                    <ListGroup.Item>Price: {eventPrice}</ListGroup.Item>
                                                                    <ListGroup.Item>Tags: {eventTags}</ListGroup.Item>
                                                                </ListGroup>
                                                            </Row>
                                                            <br/>
                                                        </Col>
                                                        <Col style={{width:"33%"}}></Col>
                                                    </Row>
                                            </Container>
                                        </Collapse>     
                                        <Container fluid  className="text-center">
                                            <Row className="text-center" styke={{height:"100%"}}>
                                                <Col style={{width:"33%"}}></Col>
                                                <Col style={{width:"33%", backgroundColor:"#202020", height:"100%"}} className='justify-content-center'>
                                                        <Button variant="outline-primary" id="formButton" className="btn" onClick={formAnim} style={{backgroundColor:"#252526", color:"#ffffff", fontSize:"90%", borderColor :"#18cdc6"}}>{buttonLabel}</Button>
                                                </Col>
                                                <Col style={{width:"33%"}}></Col>
                                            </Row>
                                        </Container>               
                        </Row>
                </Container>
                </body>
                </html>
            </>
    );
}

export default CreateEventPage;
