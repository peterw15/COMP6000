import './createEventPageStylesheet.css';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';



function CreateEventPage() {

    const navigate = useNavigate();
    

    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if(res.data == null) {
                navigate("/login");
            }
            else {
              
            }
        });
      } )

    const createEvent = () => {
    
        const eventName = document.getElementById('eventName').value;
        const eventDateTime = document.getElementById('eventDateTime').value;
        const location = document.getElementById('location').value; 
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            const organiser = parseInt(res.data);
            Axios.post('http://localhost:3001/createEvent', {eventName, eventDateTime, location, description, organiser, price}).then(res =>
            res.data ? console.log("SUCCESS") : console.log("FAIL")).catch(error => console.log(error));
        });
    }

    return (
        <>
            <div className="createEventPage">
                <div className="header"> Create Event </div>
                <div className="form">
                    <h2 className="subHeader"> Event Name </h2>
                    <input id="eventName" />
                    <h2 className="subHeader"> Date/Time </h2>
                    <input id="eventDateTime" /> <br />
                    <h2 className="subHeader"> Location </h2>
                    <input id="location" /> 
                    <h2 className="subHeader"> Description </h2>
                    <input id="description" />
                    <h2 className="subHeader"> Price </h2>
                    <input id="price" /> <br /> <br /> <br />
                    <button id="submit" className="btn" onClick={createEvent}> Submit </button> <br /> <br /> <br />
                </div>
            </div>
        </>
    );
}

export default CreateEventPage;
