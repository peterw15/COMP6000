import './createEventPageStylesheet.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import HeaderBar from '../general-components/HeaderBar/HeaderBar.js';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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


    return (
        <html style={{height:"2000px", width:"100%"}}>
            <body style={{height:"100%", width:"100%", backgroundColor : "blue"}}>
                <HeaderBar></HeaderBar>
                <Container fluid style={{height:"90%", width: "100%", backgroundColor:"black", margin:"0"}}>
                        <Row style={{width:"100%",height: "100%", margin:"0"}}>
                            <Col></Col>
                            <Col>
                                <div className="createEventPage">
                                    <div className="header"> Create Event </div>
                                    <div className="form">
                                        <h2 className="subHeader"> Event Name </h2>
                                        <input id="eventName" />
                                        <h2 className="subHeader"> Date/Time </h2>
                                        <input id="eventDateTime" /> <br />
                                        <h2 className="subHeader"> Location </h2>
                                        <input id="location" height="50px" />
                                        <h2 className="subHeader"> Description </h2>
                                        <input id="description" />
                                        <h2 className="subHeader"> Price </h2>
                                        <input id="price" /> 
                                        <h2 className="subHeader"> Please Select Up to 5 Tags: </h2>
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
                                                                onChange={onCheckboxChange}
                                                            />
                                                            <br />
                                                            </div>
                                                        ))
                                                    }
                                                </Col>
                                                <Col></Col>
                                            </Row>
                                        </Container>
                                        <br /> <br /> <br />
                                        <button id="submit" className="btn" onClick={createEvent}> Submit </button> <br /> <br /> <br />
                                    </div>
                                </div>

                            </Col>
                            <Col></Col>
                        </Row>
                </Container>
            </body>
        </html>
    );
}

export default CreateEventPage;
