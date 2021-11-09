import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../firebase"
// import { Redirect } from 'react-router'
import Home from "../Home/Home"
import axios, { Axios } from "axios"

export default function Profile() {
  const history = useHistory()
  const [accid, setAccid] = useState("")
  const [accbal, setAccbal] = useState("")
  const [privatekey, setPrivatekey] = useState("")
  const [user, loading, error] = useAuthState(auth);
  // const [user, setUser] = useState(auth.currentUser)
  // function authuser() {
  //   auth.onAuthStateChanged(user => {
  //     setUser(user)
  //   })
  // }

  useEffect(async () => {
    // authuser()
    user &&
    db.collection("accounts")
      .where("email", "==", user.email)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setAccid(doc.data().accid)
          setPrivatekey(doc.data().privatekey)
        })
      })
      user &&
      await axios.get(`http://localhost:8000/profile/${accid}/${privatekey}`)
        .then((res) => {
            console.log(res.data.accbal)
            setAccbal(res.data.accbal.hbars)
          },(err)=> console.log(err))

  }, [user])

  function loadProfile() {
    // authuser()
    const logout = () => {
      auth.signOut()
      history.pushState({},"",'/')
    }

    return (
      <div
        className="profile-card"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "50px",
        }}
      >
        <Card style={{ maxWidth: "300px" }}>
          <Card.Img variant="top" src={auth.currentUser.photoURL} />
          <Card.Body>
            <Card.Title>{auth.currentUser.displayName}</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
              dolor aperiam ullam fuga, natus quis iusto architecto a itaque
              facere.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{user.email}</ListGroupItem>
            <ListGroupItem>some information</ListGroupItem>
                    <ListGroupItem>Account Id : {accid}</ListGroupItem>
                    <ListGroupItem>Account Balance : {accbal}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="/">Home</Card.Link>
            <Card.Link href="/" onClick={logout}>
              Logout
            </Card.Link>
            {/* <Button onClick={logout}>Logout</Button> */}
          </Card.Body>
        </Card>
      </div>
    )
  }

  return (
    <>
      { (loading) ? <h1>loading...</h1> : ( user ? loadProfile() : <Home/>)}
    </>
  )
}
