import {React, useState, useEffect} from "react";
import {Navbar, Container, Nav, FormControl, Form, Button} from 'react-bootstrap';
import { auth, provider } from "../../firebase";
// import {useAuthState} from "react-firebase-hooks/auth";
import Login from "../Login/Login"

export default function NavigationBar(){
    // const [user] = useAuthState(auth);
    
    function navbar1() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="/">MovieNix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/browse">Browse</Nav.Link>
                        <Nav.Link href="#">Random</Nav.Link>
                    </Nav>
                    <Form className="d-flex me-auto">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
        );
    }

    // function navbar2(){
    //     return (
    //         <div>Hi there!</div>
    //     );
    // }

    // return user ? navbar1() : navbar2();
    return navbar1();
}