import './createEventPageStyleSheet.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { ListGroup } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import background from './background3.png';

var index = 0;

const checkState = {
    Academic: false, Arts: false, Drinking: false, Mindfulness: false, Music: false, Off_Campus: false, On_Campus: false,
    Outdoors: false, Science: false, Social: false, Sports: false
};

var checkedBoxes = 0;

function CreateEventPage() {

    const navigate = useNavigate();

    const icons = ["pin.png", "alcohol.png", "apple.png", "ball.png", "basketball.png", "bike.png", "book.png", "bus.png", "car.png",
        "clock.png", "golf.png", "id.png", "mind.png", "monitor.png", "mouse.png", "music.png", "paintbrush.png", "pencil.png", "phone.png",
        "abbacus.png", "present.png", "science.png", "shoe.png", "sofa.png", "tags.png", "target.png", "thermometer.png", "wallet.png", "water.png",];


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

    function gatherTags() {
        const trueTags = [];
        for (let i = 0; i < tags.length; i++) {
            const element = document.getElementById(tags[i]);
            if (checkState[element.id]) {
                trueTags.push(tags[i]);
            }
        }
        return trueTags;
    }

    const tags = ['Academic', 'Arts', 'Drinking', 'Mindfulness', 'Music', 'Off_Campus', 'On_Campus',
        'Outdoors', 'Science', 'Social', 'Sports'];

    const colors = ['#3B7F89', '#E84849', '#4ABC96', '#49A0AE', '#E84849', '#65A844', '#6EC2CB', '#6CC077', '#089283', '#ED3351'
        , '#F37C2A'];

    function createEvent() {

        const finalTags = gatherTags();
        console.log(finalTags);

        const eventName = document.getElementById('eventName').value;
        const eventDateTime = eventDate + " " + eventTime + ":00";
        console.log(eventDateTime);
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const imageURL = selectedIcon;

        console.log(imageURL);

        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            const organiser = parseInt(res.data);
            Axios.post('http://localhost:3001/createEvent', { eventName, eventDateTime, location, description, organiser, price, imageURL }).then(res =>
                res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error)).then(
                    Axios.post('http://localhost:3001/getEventID', { eventName, eventDateTime, location, description, organiser, price, imageURL }).then(res => {

                        const EventID = res.data[0].EventID;

                        for (let i = 0; i < finalTags.length; i++) {
                            const tag = finalTags[i];
                            Axios.post('http://localhost:3001/addEventTag', { EventID, tag }).then(res =>
                                res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error));
                        }

                        navigate("/manageevents");
                    }));
        });
    }

    const ref = useRef(0);


    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventPrice, setEventPrice] = useState("");
    const [eventTags, setEventTags] = useState([]);
    const [eventDateTime, setEventDateTime] = useState("");


    function summaryFunction() {
        setEventName(document.getElementById("eventName").value);
        setEventDate(document.getElementById("eventDate").value);
        setEventTime(document.getElementById("eventTime").value);
        setEventLocation(document.getElementById("location").value);
        setEventDescription(document.getElementById("description").value);
        setEventPrice(document.getElementById("price").value);
        setEventTags(gatherTags().map((tag) => tag + " | "));
    }

    const [openStart, setOpenStart] = useState(true);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);
    const [open8, setOpen8] = useState(false);

    const [buttonLabel, setButtonLabel] = useState("Begin");
    const [buttonSubmit, setButtonSubmit] = useState(false);

    function buttonHandler() {
        if (!buttonSubmit) {
            formAnim();
        }
        else if (buttonSubmit) {
            createEvent();
        }
    }

    function onTagSelect(event) {
        var tagId = event.target.id;
        checkState[tagId] = !checkState[tagId];
        if(checkState[tagId]) {
            event.target.style.borderColor = "#18cdc6";
        }
        else {
            event.target.style.borderColor = "transparent";
        }
    }


    function formAnim() {
        switch (index) {
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
                window.scrollTo({ top: 300, left: 0, behavior: 'smooth' })
                break;
            case 3:
                setOpen4(true);
                index++;
                window.scrollTo({ top: 600, left: 0, behavior: 'smooth' })
                break;
            case 4:
                setOpen5(true);
                index++;
                window.scrollTo({ top: 900, left: 0, behavior: 'smooth' })
                break;
            case 5:
                setOpen6(true);
                index++;
                window.scrollTo({ top: 1200, left: 0, behavior: 'smooth' })
                break;
            case 6:
                setOpen7(true);
                index++;
                window.scrollTo({ top: 1800, left: 0, behavior: 'smooth' })
                break;
            case 7:
                summaryFunction();
                setOpen8(true);
                index++;
                window.scrollTo({ top: 3000, left: 0, behavior: 'smooth' })
                setButtonLabel("Create Event");
                setButtonSubmit(true);
                break;


        }
    }

    function handleChange(event) {

        const value = event.target.value;

        switch (event.target.id) {
            case "eventName":
                setEventName(value);
                break;

            case "eventDate":
                setEventDate(value);
                dateTimeFormat();
                break;

            case "eventTime":
                setEventTime(value);
                dateTimeFormat();
                break;

            case "location":
                setEventLocation(value);
                break;

            case "description":
                setEventDescription(value);
                break;

            case "price":
                setEventPrice(value);
                break;
        }
    }

    function dateTimeFormat() {
        var date = new Date(eventDate + " " + eventTime);
        setEventDateTime(date.toDateString() + " " + date.toLocaleTimeString());
    }

    const [selectedIcon, setSelectedIcon] = useState("eventIcons/pin.png")

    function iconSelect(event) {
        document.getElementById(selectedIcon).style.borderColor = "transparent"
        setSelectedIcon(event.target.id);
        event.target.style.borderColor = "#18cdc6";
    }



    return (
        <>
            <html style={{ height: "3200px", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", fontFamily: "roboto" }} className='justify-content-center'>
            <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/>  
                <HeaderBar></HeaderBar>
                <Row style={{ width: "100%", height: "100%" }} className='justify-content-center'>
                    <Row style={{ width: "80%", height: "100%" }} className="createEventbackground">
                        <Container fluid style={{ height: "98%", width: "100%", marginTop: "2%" }} className="createEventFormContainer">
                            <Row style={{ width: "100%", height: "100%", margin: "0", backgroundColor: "#202020" }} className="text-center">
                                <Col style={{ width: "100%", height: "100%", margin: "0" }} className="createEventCol">
                                    <Container fluid style={{ marginTop: "2%", width: "100%" }} className="createEventFormContainer">
                                        <Collapse in={openStart}>
                                            <Container fluid style={{ width: "100%", height: "100%" }} className="formContainer">
                                                <Row className="text-center" style={{ height: "100%" }}>
                                                    <Col style={{ width: "33%" }} className="createEventCol"></Col>
                                                    <Col>
                                                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                                    </Col>
                                                    <Col style={{ width: "33%" }} className="createEventCol"></Col>
                                                </Row>
                                            </Container>
                                        </Collapse>
                                        <h2 className="createEventHeader" style={{ fontSize: "70px", margin: "0" }}>Create Event</h2>
                                    </Container>
                                    <br />
                                    <Collapse in={open1}>
                                        <Container fluid style={{ width: "100%" }} className="formContainer">
                                            <Row className="text-center" style={{ height: "100%" }}>
                                                <Col className="createEventFormCol">
                                                    <br />
                                                    <h2 className="createEventFormLabel">What would you like your event to be called?</h2>
                                                    <Row className='justify-content-center'><Form.Control type="text" id="eventName" style={{ marginTop: "3%", width: "33%" }} className='eventInput' onChange={handleChange} /></Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open2}>
                                        <Container fluid className="text-center" style={{ backgroundColor: "#202020", width: "100%" }}>
                                            <Row className="text-center" styke={{ height: "100%" }}>
                                                <Col className="createEventFormCol">
                                                    <br />
                                                    <h2 className="createEventFormLabel">What is the date/time of your event?</h2>
                                                    <Row className='justify-content-center'>
                                                        <Form.Control id="eventDate" type="date" style={{ marginTop: "3%", width: "33%" }} className='eventInput' onChange={handleChange} />
                                                    </Row> <br />
                                                    <Row className='justify-content-center'>
                                                        <Form.Control id="eventTime" type="time" style={{ width: "33%" }} className='eventInput' onChange={handleChange} />
                                                    </Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open3}>
                                        <Container fluid className="text-center" style={{ backgroundColor: "#202020", width: "100%" }}>
                                            <Row className="text-center" styke={{ height: "100%" }}>
                                                <Col className="createEventFormCol">
                                                    <br />
                                                    <h2 className="createEventFormLabel">Where will your event be located?</h2>
                                                    <Row className='justify-content-center'><Form.Control id="location" style={{ marginTop: "3%", width: "33%" }} className='eventInput' onChange={handleChange} /></Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open4}>
                                        <Container fluid className="text-center" style={{ backgroundColor: "#202020", width: "100%" }}>
                                            <Row className="text-center" styke={{ height: "100%" }}>
                                                <Col className="createEventFormCol">
                                                    <br />
                                                    <h2 className="createEventFormLabel">How would you describe your event?</h2>
                                                    <Row className='justify-content-center'><Form.Control id="description" as="textarea" style={{ marginTop: "3%", width: "50%", height: "100px" }} className='eventInput' onChange={handleChange} /></Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open5} fluid className="text-center">
                                        <Container fluid className="text-center" style={{ backgroundColor: "#202020", width: "100%" }}>
                                            <Row className="text-center" styke={{ height: "100%" }}>
                                                <Col className="createEventFormCol">
                                                    <br />
                                                    <h2 className="createEventFormLabel">How much will your event cost?</h2>
                                                    <Row className='justify-content-center'><Form.Control id="price" style={{ marginTop: "3%", width: "33%" }} className='eventInput' onChange={handleChange} /></Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open6} fluid className="text-center">
                                        <Container fluid className="text-center" style={{ width: "100%" }}>
                                            <Row className="text-center" style={{ height: "100%" }}>
                                                <Col className="createEventFormCol">
                                                    <br />
                                                    <h2 className="createEventFormLabel"> Please Select Your Interests: </h2>
                                                    <br />
                                                    <Row className='justify-content-center'>
                                                        <Container style={{ width: "70%", marginLeft: "0px", marginRight: "0px", paddingLeft: "50px", paddingRight: "0px" }}>
                                                            {tags.map((tag, index) =>
                                                                <Alert id={`${tag}`} style={{ border: "5px solid transparent", padding: "5px",width: "10%", minWidth: "140px", marginLeft: "5px", marginRight: "5px", float: "left", backgroundColor: colors[index % colors.length], color: "#ffffff" }} onClick={onTagSelect}>
                                                                    {tag}
                                                                </Alert>
                                                            )}
                                                        </Container>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open7} fluid className="text-center">
                                        <Container fluid className="text-center" style={{ width: "100%" }}>
                                            <Row className="text-center">
                                                <Col className="createEventFormCol">
                                                    <br />
                                                    <h2 className="createEventFormLabel">Please select an icon for your event</h2>
                                                    <br />
                                                    <Row className='justify-content-center'>
                                                        <Container style={{ width: "75%" }}>
                                                            {icons.map(icon =>
                                                                <Image src={"eventIcons/" + icon} className="createEventCardImg" onClick={iconSelect} id={"eventIcons/" + icon} roundedCircle />
                                                            )}
                                                        </Container>
                                                    </Row>
                                                    <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open8} fluid className="text-center">
                                        <Container fluid className="text-center" style={{ width: "100%" }}>
                                            <Row className="text-center">
                                                <Col className="createEventFormCol">
                                                    <br />
                                                    <h2 className="createEventFormLabel">Summary</h2> <br />
                                                    <Row className='justify-content-center'>
                                                        <Card className="eventsCard">
                                                            <Container flex>
                                                                <Row className="cardRow">
                                                                    <Col className="imgCol" lg="2">
                                                                        <Card.Img src={selectedIcon} className="cardImg"></Card.Img>
                                                                    </Col>
                                                                    <Col className="infoCol" >
                                                                        <Row className="infoRow" style={{ textAlign: "left" }}>
                                                                            <img className="cardIcon" src="icons/locationPin.png"></img>
                                                                            <div className="infoLabel">{eventLocation}</div>
                                                                            <img className="cardIcon" src="icons/calendar.png"></img>
                                                                            <div className="infoLabel">{eventDateTime}</div>
                                                                        </Row>
                                                                        <Row className="infoRow" style={{ textAlign: "left" }}>
                                                                            <img className="cardIcon" src="icons/pound.png"></img>
                                                                            <div className="infoLabel">{eventPrice}</div>
                                                                            <img className="cardIcon" src="icons/avatar.png"></img>
                                                                            <div className="infoLabel">You</div>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                                <br />
                                                                <Row className="cardTitleRow" style={{ textAlign: "left" }}>
                                                                    <Card.Title className="cardTitle">{eventName}</Card.Title>
                                                                </Row>
                                                                <br />
                                                            </Container>
                                                            <Card.Body className="cardBody" style={{ textAlign: "left" }}>
                                                                <Card.Text className="cardText">{eventDescription}</Card.Text>
                                                            </Card.Body>
                                                            <Row className="buttonRow">

                                                            </Row>
                                                        </Card>
                                                    </Row>
                                                    <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Container fluid className="text-center" style={{ width: "100%" }}>
                                        <Row className="text-center" style={{ height: "100%" }}>
                                            <Col style={{ width: "33%", height: "100%" }} className='justify-content-center'>
                                                <br />
                                                <Button variant="outline-primary" id="formButton" className="formButton" onClick={buttonHandler} style={{ backgroundColor: "#252526", width: "33%", color: "#ffffff", height: "50px", fontSize: "20px", borderColor: "#18cdc6" }}>{buttonLabel}</Button>
                                            </Col>
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

export default CreateEventPage;
