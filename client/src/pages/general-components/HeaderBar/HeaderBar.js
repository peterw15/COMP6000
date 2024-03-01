import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./HeaderStyleSheet.css"
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import logo from "./logoCropped2.png";
import searchIcon from "./search.png";
import eventIcon from "./event.png";



export default function HeaderBar(props) {

    useEffect(() => {
        Axios.get('http://localhost:3001/loggedIn', {}).then(res => {
            console.log(res);
            if (res.data == null) {
                navigate("/login");
            }
            else {
                getDetails(parseInt(res.data));
            }
        });
    })

    const navigate = useNavigate();

    const logout = () => {
        Axios.get('http://localhost:3001/logout', {}).then(res => { navigate("/login"); });
    }

    const getDetails = (userID) => {
        Axios.post('http://localhost:3001/home', {
            information: "User Details",
            UserID: userID
        }).then(res => setName("Welcome " + res.data.firstName + "!")).catch(error => console.log(error));
    }



    const [fullName, setName] = useState("null");



    return (
        <>
            <div className="mb-2">
                <Navbar variant="dark" bg="bgColor" expand="lg" className="fixed-top">
                    <Container fluid>
                        <Navbar.Brand href="home"><div class="brand"><img class="logo" src={logo}></img></div></Navbar.Brand>
                        <Nav>
                            <Navbar.Brand><b>{fullName}</b></Navbar.Brand>
                        </Nav>
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse id="navbar-dark-example">
                            <Nav>
                                <NavDropdown id="nav-dropdown-dark-example" title="Events" menuVariant="dark" >
                                    <NavDropdown.Item href="events">Browse Events</NavDropdown.Item>
                                    <NavDropdown.Item href="joinedevents">Joined Events</NavDropdown.Item>
                                    <NavDropdown.Item href="createevent">Create Event </NavDropdown.Item>
                                    <NavDropdown.Item href="manageevents">Manage Events</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            {/* <Nav>
                                <NavDropdown id="nav-dropdown-dark-example" title="Societies" menuVariant="dark" >
                                    <NavDropdown.Item href="societies">Browse Societies</NavDropdown.Item>
                                    <NavDropdown.Item href="createSocieties">Create Society </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Your Joined Societies</NavDropdown.Item>
                                </NavDropdown>
                            </Nav> */}
                            <Nav>
                                <Nav.Link href="/search">Search<img src={searchIcon} class="icon"></img></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <Nav.Link onClick={logout} id="navbar-dark-example">Logout</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    );


}