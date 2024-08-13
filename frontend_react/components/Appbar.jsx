import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";

import { Context } from "../public/context/context_api";



function Appbar() {

 

    const [a , set_a] =  useState(true);

    const {islogin} = useContext(Context);
   
   
    const listshow= ()=>{
     
   set_a(!a);
   
    }



    return (
        <>
            {["lg"].map((expand) => (
                <Navbar key={expand} expand={expand} className="navbaar">
                    <Container fluid>
                        <Navbar.Brand href="#" className="ms-3 brand_name">PORTFOLIO</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className="nav_manu_togal"
                        >
                            <Offcanvas.Header closeButton className="nav_togal">
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} >
                                PORTFOLIO ✔️🙎🏻
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="nav_menu">
                                {/* <div className="navlink"> */}
                                <Nav className="justify-content-end flex-grow-1 nav_link">
                                    <Nav.Link as={NavLink} to={"/"}>
                                        Home
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to={"/contact"}>
                                        Contact
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to={"/about"}>
                                        About
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to={"/Projects"}>
                                        Projects
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to={"/file"}>
                                        P/U
                                    </Nav.Link>



                                    {islogin ? 
                                         (<Nav.Link as={NavLink} to={"/logout"}>
                                            Logout
                                        </Nav.Link>) :(<>
                                          
                                          
                                    <Nav.Link as={NavLink} to={"/login"}>
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to={"/signup"}>
                                    signup
                                    </Nav.Link>


                                         </>)}





                                 
                                    {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                                    {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className="px-3"
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                                </Nav>

                                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}

                                {/* </div> */}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default Appbar;
