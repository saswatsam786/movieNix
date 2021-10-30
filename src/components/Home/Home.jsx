import React from "react";
import {Button} from 'react-bootstrap';

export default function Login(){
    const func = () =>{
        window.location = "/login";
    }
    return(
        <Button variant="outline-primary" onClick={func}>Click here to Login</Button>
    );
}