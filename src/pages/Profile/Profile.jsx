// eslint-disable-next-line
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import Home from "../Home/Home";
// eslint-disable-next-line
import axios, { Axios } from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './profile.css';

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [accid, setAccid] = useState("");
  const [accbal, setAccbal] = useState("");
  const [privatekey, setPrivatekey] = useState("");

  useEffect( () => {
    user &&
      db
        .collection("accounts")
        .where("email", "==", user.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setAccid(doc.data().accid);
            setPrivatekey(doc.data().privatekey);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    
        async function fetchData() {
          let data = await axios.post(`http://localhost:8000/balance`, {
            id: accid,
            key: privatekey,
          });
          console.log(data.data.data.balance._valueInTinybar);
          setAccbal(data.data.data.balance._valueInTinybar / 100000000);
        }
    fetchData()
  }, [accid, privatekey, user]);

  // Axios({
  //     method: "POST",
  //     withCredentials: true,
  //     url: `http://localhost:8000/profile/${accid}/${privatekey}`
  // }).then(res => console.log(res.data))

  function loadProfile() {
    const logout = () => {
      auth.signOut()
    };

    return (
      <div
        className="profile-card"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "50px",
        }}
      >
        <Card 
          style={
            { 
              maxWidth: "300px",
              background: "rgb(54, 57, 64)",
              color: "white"
            }
          }
        >
          <Card.Img variant="top" src={auth.currentUser.photoURL} />
          <Card.Body>
            <Card.Title>{auth.currentUser.displayName}</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
              dolor aperiam ullam fuga, natus quis iusto architecto a itaque
              facere.
            </Card.Text>
          </Card.Body>
          <ListGroup 
            className="list-group-flush"
          >
            <ListGroupItem className="random">{user.email}</ListGroupItem>
            <ListGroupItem className="random">some information</ListGroupItem>
            <ListGroupItem className="random">Account Id : {accid}</ListGroupItem>
            <ListGroupItem className="random">Account Balance : {accbal}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            {/* <Card.Link href="/">Home</Card.Link> */}
            <Link to="/">Home</Link>
            <Link
              to="/"
              style={
                {
                  paddingLeft:"20px"
                }
              }
              onClick={logout}>Logout</Link>
            {/* <Card.Link href="/" onClick={logout}>
              Logout
            </Card.Link> */}
            {/* <Button onClick={logout}>Logout</Button> */}
          </Card.Body>
        </Card>
      </div>
    );
  }

  // function redirect12() {
  //   window.location = "/";
  // }

  return <>{loading ? <h1>loading...</h1> : user ? loadProfile() : <Home />}</>;
}
