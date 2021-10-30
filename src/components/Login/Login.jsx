// import ReactDom from "react-dom";
import React from "react";
import {Card, Button} from 'react-bootstrap';
import "./login.css";

export default function Login(){
    const func = () =>{
        window.location = "/";
    }
    return(
        <div className="bg">
            <div className="holder">
                <Card className="text-center">
                    <Card.Header>MovieNix Login</Card.Header>
                    <Card.Body>
                        <Card.Title>Login/Sign Up</Card.Title>
                        <Card.Text>
                        Login or create your account through Google
                        </Card.Text>
                        <Button variant="outline-primary" onClick={func}>Login</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Powered By Google</Card.Footer>
                </Card>
            </div>  
        </div>
    );
}