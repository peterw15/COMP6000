import './createSocietiesPageStyleSheet.css';
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

function CreateSocietyPage() {

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

    function createSociety() {

        const finalTags = gatherTags();
        console.log(finalTags);

        const societyName = document.getElementById('societyName').value;
        const societyDescription = document.getElementById('description').value;
        const societyEmail = document.getElementById('email').value;
        const societyWebsite = document.getElementById('website').value;
        const societyImageURL = selectedIcon;

        console.log(societyImageURL);

        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            const organiser = parseInt(res.data);
            Axios.post('http://localhost:3001/createSociety', { societyName, societyDescription, societyEmail, societyWebsite, organiser, societyImageURL }).then(res =>
                res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error)).then(
                    Axios.post('http://localhost:3001/getSocietyID', { societyName, societyDescription, societyEmail, societyWebsite, organiser, societyImageURL }).then(res => {

                        const SocietyID = res.data[0].SocietyID;

                        for (let i = 0; i < finalTags.length; i++) {
                            const tag = finalTags[i];
                            Axios.post('http://localhost:3001/addSocietyTag', { SocietyID, tag }).then(res =>
                                res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error));
                        }

                        navigate("/managesocieties");
                    }));
        });
    }

    const ref = useRef(0);


    const [societyName, setSocietyName] = useState("");
    const [societyDescription, setSocietyDescription] = useState("");
    const [societyEmail, setSocietyEmail] = useState("");
    const [societyWebsite, setSocietyWebsite] = useState("");
    const [societyTags, setSocietyTags] = useState([]);

    function summaryFunction() {
        setSocietyName(document.getElementById("societyName").value);
        setSocietyDescription(document.getElementById("description").value);
        setSocietyEmail(document.getElementById("email").value);
        setSocietyWebsite(document.getElementById("website").value);
        setSocietyTags(gatherTags().map((tag) => tag + " | "));
    }

    const [openStart, setOpenStart] = useState(true);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);

    const [buttonLabel, setButtonLabel] = useState("Begin");
    const [buttonSubmit, setButtonSubmit] = useState(false);

    function buttonHandler() {
        if (!buttonSubmit) {
            formAnim();
        }
        else if (buttonSubmit) {
            createSociety();
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
                summaryFunction();
                index++;
                window.scrollTo({ top: 1800, left: 0, behavior: 'smooth' })
                setButtonLabel("Create Society");
                setButtonSubmit(true);
                break;
        }
    }

    function handleChange(event) {

        const value = event.target.value;

        switch (event.target.id) {
            case "societyName":
                setSocietyName(value);
                break;

            case "description":
                setSocietyDescription(value);
                break;

            case "email":
                setSocietyEmail(value);
                break;

            case "website":
                setSocietyWebsite(value);
                break;
        }
    }

    const [selectedIcon, setSelectedIcon] = useState("societyIcons/pin.png")

    function iconSelect(event) {
        document.getElementById(selectedIcon).style.borderColor = "transparent"
        setSelectedIcon(event.target.id);
        event.target.style.borderColor = "#18cdc6";
    }



    return (
        <>
            <html style={{ height: "1600px", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", fontFamily: "roboto" }}>
            <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/>  
                <HeaderBar></HeaderBar>
                <Row style={{ width: "100%", height: "100%" }} className='justify-content-center'>
                    <Row style={{ width: "80%", height: "100%" }} className="createSocietybackground">
                        <Container fluid style={{ height: "98%", width: "100%", marginTop: "2%" }} className="createSocietyFormContainer">
                            <Row style={{ width: "100%", height: "100%", margin: "0", backgroundColor: "#202020" }} className="text-center">
                                <Col style={{ width: "100%", height: "100%", margin: "0" }} className="createSocietyCol">
                                    <Container fluid style={{ marginTop: "2%", width: "100%" }} className="createSocietyFormContainer">
                                        <Collapse in={openStart}>
                                            <Container fluid style={{ width: "100%", height: "100%" }} className="formContainer">
                                                <Row className="text-center" style={{ height: "100%" }}>
                                                    <Col style={{ width: "33%" }} className="createSocietyCol"></Col>
                                                    <Col>
                                                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                                    </Col>
                                                    <Col style={{ width: "33%" }} className="createSocietyCol"></Col>
                                                </Row>
                                            </Container>
                                        </Collapse>
                                        <h2 className="createSocietyHeader" style={{ fontSize: "70px", margin: "0" }}>Create Society</h2>
                                    </Container>
                                    <br />
                                    <Collapse in={open1}>
                                        <Container fluid style={{ width: "100%" }} className="formContainer">
                                            <Row className="text-center" style={{ height: "100%" }}>
                                                <Col className="createSocietyFormCol">
                                                    <br />
                                                    <h2 className="createSocietyFormLabel">What would you like your society to be called?</h2>
                                                    <Row className='justify-content-center'><Form.Control type="text" id="societyName" style={{ marginTop: "3%", width: "33%" }} className='societyInput' onChange={handleChange} /></Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open2}>
                                        <Container fluid className="text-center" style={{ backgroundColor: "#202020", width: "100%" }}>
                                            <Row className="text-center" styke={{ height: "100%" }}>
                                                <Col className="createSocietyFormCol">
                                                    <br />
                                                    <h2 className="createSocietyFormLabel">Tell us about your society</h2>
                                                    <Row className='justify-content-center'>
                                                        <Form.Control id="description" as="textarea" style={{ marginTop: "3%", width: "50%", height: "100px" }} className='societyInput' onChange={handleChange} />
                                                    </Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open3}>
                                        <Container fluid className="text-center" style={{ backgroundColor: "#202020", width: "100%" }}>
                                            <Row className="text-center" styke={{ height: "100%" }}>
                                                <Col className="createSocietyFormCol">
                                                    <br />
                                                    <h2 className="createSocietyFormLabel">Enter society email</h2>
                                                    <Row className='justify-content-center'><Form.Control id="email" style={{ marginTop: "3%", width: "33%" }} className='societyInput' onChange={handleChange} /></Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open4}>
                                        <Container fluid className="text-center" style={{ backgroundColor: "#202020", width: "100%" }}>
                                            <Row className="text-center" styke={{ height: "100%" }}>
                                                <Col className="createSocietyFormCol">
                                                    <br />
                                                    <h2 className="createSocietyFormLabel">Enter society website (if any)</h2>
                                                    <Row className='justify-content-center'><Form.Control id="website" style={{ marginTop: "3%", width: "33%" }} className='societyInput' onChange={handleChange} /></Row> <br />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>
                                    <Collapse in={open5} fluid className="text-center">
                                        <Container fluid className="text-center" style={{ width: "100%" }}>
                                            <Row className="text-center" style={{ height: "100%" }}>
                                                <Col className="createSocietyFormCol">
                                                    <br />
                                                    <h2 className="createSocietyFormLabel"> Please Select Some Tags: </h2>
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

export default CreateSocietyPage;


