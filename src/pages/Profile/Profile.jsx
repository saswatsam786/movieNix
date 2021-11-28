// eslint-disable-next-line
// import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
// eslint-disable-next-line
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Grid,
  Avatar,
} from '@mui/material'
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from '@emotion/react';
import { Link, useHistory } from "react-router-dom";
import Home from "../Home/Home";
import axios, { Axios } from "axios";
import "./profile.css";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [accid, setAccid] = useState("");
  const [accbal, setAccbal] = useState("");
  const [privatekey, setPrivatekey] = useState("");
  // const history = useHistory()

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
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
    fetchData();
  }, [accid, privatekey, user]);

  // Axios({
  //     method: "POST",
  //     withCredentials: true,
  //     url: `http://localhost:8000/profile/${accid}/${privatekey}`
  // }).then(res => console.log(res.data))

  function loadProfile() {
    // authuser()
    const logout = () => {
      auth.signOut();
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '70px',
        }}
        className="profile-card"
      >
        <ThemeProvider theme={darkTheme}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={8}>
              <Card 
                elevation={2}
                sx={{
                  width: {xs: '230px', sm: '50%'},
                  // maxWidth: 345,
                  display: 'grid',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '50px'
                }}>
                <CardContent>
                  <Avatar 
                    src={user.photoURL}
                    sx={{
                      width: '200px',
                      height: '200px',
                      margin: 'auto'
                    }}
                    />
                </CardContent>
                <CardContent 
                  sx={{
                    margin: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }} 
                >
                  <Typography variant="h2">
                    {user.displayName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" > 
                    {user.email}
                  </Typography>
                  <div
                    style={{
                      marginTop: '50px'
                    }}
                  >
                    <Link to="/library" className="navbar-link"><Button size="large">Library</Button></Link>
                    <Link to="/" className="navbar-link"><Button onClick={logout} size="large">Logout</Button></Link>                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ 
                // maxWidth: 345,
                width: {xs: '230px', sm: '50%'},
              }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={user.photoURL}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
        {/* <Card
          style={{
            maxWidth: "300px",
            background: "rgb(54, 57, 64)",
            color: "white",
          }}
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
          <ListGroup className="list-group-flush">
            <ListGroupItem className="random">{user.email}</ListGroupItem>
            <ListGroupItem className="random">some information</ListGroupItem>
            <ListGroupItem className="random">
              Account Id : {accid}
            </ListGroupItem>
            <ListGroupItem className="random">
              Account Balance : {accbal}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="/">Home</Card.Link> 
            <Link to="/">Home</Link>
            <Link
              to="/"
              style={{
                paddingLeft: "20px",
              }}
              onClick={logout}
            >
              Logout
            </Link>
          </Card.Body>
        </Card> */}
        </Grid>
        </ThemeProvider>
      </div>
    );
  }

  return <>{loading ? <h1>loading...</h1> : user ? loadProfile() : <Home />}</>;
}
