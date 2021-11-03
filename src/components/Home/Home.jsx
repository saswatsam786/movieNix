import React from "react";
import {Button} from 'react-bootstrap';
import {auth, provider} from '../../firebase';

export default function Login(){
    const func = () =>{
        window.location = "/login";
    }
    const func2 = () =>{
        console.log(auth);
    }
    return(
        <div>
            <Button variant="outline-primary" onClick={func}>Click here to Login</Button>
            <Button variant="outline-primary" onClick={func2}>Auth State</Button>
        </div>
    );
}