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

    const [checkedBoxes, setBoxes] = useState(0);


    const onCheckboxChange = (event) => {
        const target = event.target;
        if(target.checked) {
            setBoxes(checkedBoxes + 1);
        }
        else {
            setBoxes(checkedBoxes - 1);
            if(checkedBoxes <4) {
                for(let i=0;i<tags.length;i++) {
                    const element = document.getElementById(tags[i]);
                    if(element.disabled) {
                        element.disabled = false;
                    }
        
                }
            }
        }

        if(checkedBoxes == 4) {
            for(let i=0;i<tags.length;i++) {
                const element = document.getElementById(tags[i]);
                if(!element.checked) {
                    element.disabled = true;
                }
    
            }
        }
        console.log(checkedBoxes);
    }

    const tags = ['Academic', 'Arts', 'Drinking', 'Mindfulness', 'Music', 'Off Campus', 'On Campus',
        'Outdoors', 'Science', 'Social', 'Sports', ];

    const checkTags = () => {
        const selectedTags = ["","","","",""];
        let index = 0;
        for(let i=0;i<tags.length;i++) {
            if(document.getElementById(tags[i]).checked) {
                if (index < 5) {
                    selectedTags[index] = tags[i];
                    index++;
                }
            }

        }
        console.log(selectedTags);
    }


    const createEvent = () => {

        checkTags();

        const eventName = document.getElementById('eventName').value;
        const eventDateTime = document.getElementById('eventDateTime').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);

        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            const organiser = parseInt(res.data);
            Axios.post('http://localhost:3001/createEvent', { eventName, eventDateTime, location, description, organiser, price }).then(res =>
                res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error));
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
                                                                checked= "false"
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
