// import ReactDom from "react-dom";
import React, { useEffect } from "react";
import {Card, Button} from 'react-bootstrap';
import "./login.css";
import { useHistory } from "react-router-dom";
import { db, auth, provider } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Login() {
  const history = useHistory()
  
  const signin = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    auth.signInWithPopup(provider).catch(alert);
    history.push({
      pathname: "/profile"
    })
  };

  // useEffect( () => {
  //      (user) ?
  //       db.collection("accounts").add({
  //         email : user.email,
  //         accid : ""
  //       }) : console.log("not logged")
  // },[user])

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg">
    <div className="holder">
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