// import ReactDom from "react-dom";
import React from "react"
import { Card, Button } from "react-bootstrap"
import "./login.css"
import { db, auth, provider } from "../../firebase"
import axios from 'axios'
import { useHistory } from "react-router-dom"

export default function Login() {
  const history = useHistory()
  
  const signin = async (e) => {
    e.preventDefault()
    provider.setCustomParameters({ prompt: "select_account" })
    await auth
      .signInWithPopup(provider)
      .catch(alert)
      .then(() => {
        const user = auth.currentUser
        let acc = false
        db.collection("accounts")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              if (doc.data().email === user.email) {
                alert("You already have an account ID.")
                acc = true
              }
            })
            if (acc === false) {
              axios.get("http://localhost:8000/createAccount").then((props) => {
                db.collection("accounts")
                  .add({
                    email: user.email,
                    accid: props.data.id,
                    privatekey: props.data.privatekey,
                    publickey: props.data.publickey,
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              })
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })

        history.push({
          pathname: "/profile",
        })
      })
  }

  return (
    <div
      className="bg"
      style={{
        // backgroundColor: "rgb(220, 220, 220)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="holder radnom">
        <Card className="text-center random">
          <Card.Header>MovieNix Login</Card.Header>
          <Card.Body>
            <Card.Title>Login/Sign Up</Card.Title>
            <Card.Text>Login or create your account through Google</Card.Text>

            {/* <Link to="profile"> */}
            <Button variant="outline-light" onClick={signin}>
              Login
            </Button>
            {/* </Link> */}
          </Card.Body>
          <Card.Footer className="text-muted">Powered By Google</Card.Footer>
        </Card>
      </div>
    </div>
  )
}
