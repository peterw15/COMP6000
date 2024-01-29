//import './createEventPageStylesheet.css';
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


    return (
            <>
                <HeaderBar></HeaderBar>
                <Container fluid style={{height:"100vh", width: "100%", backgroundColor:"#202020", margin:"0"}}>
                        <Row style={{width:"100%",height: "100%", margin:"0"}} className="text-center">
                                <Carousel style={{marginTop: "100px", height:"70%", width:"70%", marginLeft:"15%", marginRight: "15%", borderColor: "#18cdc6", border: "3px solid #18cdc6"}} ref={ref} interval={null} controls={true}>
                                    <Carousel.Item>
                                        <Container fluid style={{marginTop: "10%", marginBottom :"5%"}}>
                                            <h2 className="subHeader" style={{color:"#18cdc6", fontSize:"70px"}}>Let's create an event!</h2>
                                            <Button variant="outline-primary" id="begin" className="btn" onClick={onNext}>Begin</Button>
                                        </Container>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Container fluid style={{marginTop: "10%", marginBottom :"5%"}}>
                                            <h2 className="subHeader" style={{color:"#18cdc6"}}>What would you like your event to be called?</h2>
                                            <input id="eventName" style={{marginTop:"5%"}} />
                                        </Container>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Container fluid style={{marginTop: "10%", marginBottom :"5%"}}>
                                            <h2 className="subHeader" style={{color:"#18cdc6"}}>What is the date/time of your event?</h2>
                                            <input id="eventDateTime" style={{marginTop:"5%"}} />
                                        </Container>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Container fluid style={{marginTop: "10%", marginBottom :"5%"}}>
                                            <h2 className="subHeader" style={{color:"#18cdc6"}}>Where will your event be located?</h2>
                                            <input id="location" style={{marginTop:"5%"}}/>
                                        </Container>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Container fluid style={{marginTop: "10%", marginBottom :"5%"}}>
                                            <h2 className="subHeader" style={{color:"#18cdc6",}}>How would you describe your event?</h2>
                                            <input id="description" style={{marginTop:"5%"}} />
                                        </Container>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Container fluid style={{marginTop: "10%", marginBottom :"5%"}}>
                                            <h2 className="subHeader" style={{color:"#18cdc6"}}>How much will your event cost?</h2>
                                            <input id="price" style={{marginTop:"5%"}} /> 
                                        </Container>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                            <Container fluid style={{marginTop: "5%", marginBottom: "5%"}}>
                                                <h2 className="subHeader" style={{color:"#18cdc6"}}> Please Select Up to 5 Tags: </h2>
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
                                                    </Col>
                                                    <Col></Col>
                                                </Row>
                                            </Container>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Container fluid style={{marginTop: "5%", marginBottom: "5%"}}> 
                                            <Button variant="outline-primary" id="submit" className="btn" onClick={createEvent}>Submit</Button>
                                        </Container>
                                    </Carousel.Item>
                                </Carousel>                             
                        </Row>
                </Container>
            </>
    );
}

export default CreateEventPage;
