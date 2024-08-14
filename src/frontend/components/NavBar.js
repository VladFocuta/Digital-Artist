import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import UserContext from '../components/UserProvider';
import React, { useContext } from 'react'
function NavigationBar({ profile }) {
    const { user } = useContext(UserContext);
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-1" style={{ backgroundColor: 'grey' }}>
            <Container>
                {!profile ? (
                    <>
                        <Navbar.Brand >Digital Artist</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home" as={NavLink} to="/">Home</Nav.Link>
                                <Nav.Link href="#portofolio" as={NavLink} to={Object.keys(user).length === 0 ? "/Login" : "/Portofolio"}>Profile</Nav.Link>
                                {Object.keys(user).length === 0 ? (
                                    <>
                                        <NavDropdown title="Go to" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#login" as={NavLink} to="/Login">
                                                Login
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#signup" as={NavLink} to="/Signup">
                                                Signup
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    null
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </>
                ) : (
                    <>
                        <Navbar.Brand >Digital Artist</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home" as={NavLink} to="/">Home</Nav.Link>
                            </Nav>
                            < Logout />
                        </Navbar.Collapse>
                    </>
                )}
            </Container>
        </Navbar>
    )
}

export default NavigationBar;
