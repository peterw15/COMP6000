import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavItem from 'react-bootstrap/esm/NavItem';
import "./HeaderStyleSheet.css"
import Axios from 'axios';


function HeaderBar(props) {

    const navigate = useNavigate();

    const logout = () => {
        Axios.get('http://localhost:3001/logout', {}).then(res => { navigate("/login"); });
    }


    return (
        <>
            <div className="mb-2">
                <Navbar variant="dark" bg="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="home"><div class="brand">UniDex</div></Navbar.Brand>
                        <Nav>
                            <Navbar.Brand><b>{props.name}</b></Navbar.Brand>
                        </Nav>
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse id="navbar-dark-example">
                            <Nav>
                                <Nav.Link href="/search">Search</Nav.Link>
                            </Nav>
                            <Nav>
                                <NavDropdown id="nav-dropdown-dark-example" title="Events" menuVariant="dark" >
                                    <NavDropdown.Item href="events">Browse Events</NavDropdown.Item>
                                    <NavDropdown.Item href="createevent">Create Event </NavDropdown.Item>
                                    <NavDropdown.Item href="myevents">Your Joined Events</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown id="nav-dropdown-dark-example" title="Societies" menuVariant="dark" >
                                    <NavDropdown.Item href="societies">Browse Societies</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Create Society </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Your Joined Societies</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <Nav className="justify-content-end">
                            <Nav.Item>
                                <Nav.Link onClick={logout} id="navbar-dark-example">Logout</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </div >
        </>
    );
}

export default HeaderBar;