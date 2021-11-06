// import ReactDom from "react-dom";
import React from "react";
import {Card, Button} from 'react-bootstrap';
import "./login.css";
import { auth, provider } from "../../firebase";

export default function Login() {

  const signin = async (e) => {
    e.preventDefault()
    provider.setCustomParameters({ prompt: "select_account" });
    await auth.signInWithPopup(provider).catch(alert);
    window.location = '/'
  };

  // eslint-disable-next-line
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
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
          <Card className="text-center">
              <Card.Header>MovieNix Login</Card.Header>
              <Card.Body>
                  <Card.Title>Login/Sign Up</Card.Title>
                  <Card.Text>
                  Login or create your account through Google
                  </Card.Text>

                  {/* <Link to="profile"> */}
                    <Button variant="outline-primary" onClick={signin}>Login</Button>
                  {/* </Link> */}

              </Card.Body>
              <Card.Footer className="text-muted">Powered By Google</Card.Footer>
          </Card>
      </div>  
    </div>
  );
}