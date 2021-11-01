// import ReactDom from "react-dom";
import React from "react";
import {Form, Button} from 'react-bootstrap';
import {auth, provider} from '../../firebase';
import "./login.css";

export default function Login(){
    const signin = () =>{
        provider.setCustomParameters({prompt: "select_account"});
        auth.signInWithPopup(provider).catch(alert);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return(
        <div
            className="bg"
            style={{
                "backgroundColor":'rgb(220, 220, 220)',
                "height": '100vh',
                "display": "flex",
                "justifyContent": 'center',
                "alignItems": 'center'
            }}
        >
            <div className="holder">
                <Form className="card" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label size="lg">MovieNix Login</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Text>Click here to login to MovieNix through Google</Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={signin}>Login</Button>
                </Form>
            </div>
        </div>
    );
}