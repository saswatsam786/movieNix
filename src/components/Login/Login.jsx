import React from "react";
import {Card, Form, Button} from 'react-bootstrap';
import {auth, provider} from '../../firebase';
import "./login.css";

export default function Login(){
    const signin = async() =>{
        await provider.setCustomParameters({prompt: "select_account"});
        await auth.signInWithPopup(provider).catch(alert);
        window.location = '/';
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    // };

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
                {/*<Form className="card" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label size="lg">MovieNix Login</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Text>Click here to login to MovieNix through Google</Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={signin}>Login</Button>
                </Form> */}
                <Card className="text-center">
                    <Card.Header>MovieNix Login</Card.Header>
                    <Card.Body>
                        <Card.Title>Login/Sign Up</Card.Title>
                        <Card.Text>
                        Login or create your account through Google
                        </Card.Text>
                        <Button variant="outline-primary" onClick={signin}>Login</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Powered By Google</Card.Footer>
                </Card>
            </div>
        </div>
    );
}