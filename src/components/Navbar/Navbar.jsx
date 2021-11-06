import {React} from "react";
import {Navbar, Container, Nav, FormControl, Form, Button} from 'react-bootstrap';
import { auth } from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
// import Login from "../Login/Login"

export default function NavigationBar(){
    const [user] = useAuthState(auth);
    const logout = () => {
        auth.signOut();
        window.location = "/"
    }

    const authButton = () => {
        if (user) {
            return (
                <Nav.Link href="/">Logout</Nav.Link>
            )   
        } 
        else {
            return (
                <Nav.Link href="/login">Login</Nav.Link>
            )
        }
    }

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
                        {authButton()}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
    );
}