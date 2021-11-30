// eslint-disable-next-line
// import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Logout, VideoLibraryRounded } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { Link } from "react-router-dom";
import Home from "../Home/Home";
import axios from "axios";
import "./profile.css";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [accid, setAccid] = useState("");
  const [accbal, setAccbal] = useState("");
  const [privatekey, setPrivatekey] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [lib, setLib] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            setLib(doc.data().lib.length);
            setCreateDate(doc.data().accountCreationDate);
            console.log(accid, privatekey);
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
  }, [user, accid, privatekey]);

  function deleteDocDatabase() {
    // eslint-disable-next-line
    {
      user &&
        db
          .collection("accounts")
          .where("email", "==", user.email)
          .get()
          .then((querySnapshot) =>
            querySnapshot.forEach(async (doc) => {
              console.log(doc.id);
              db.collection("accounts").doc(doc.id).delete();
            })
          );
    }
    user.delete();
    window.location = "/";
  }

  async function deleteAccount() {
    let data = await axios.post(`http://localhost:8000/delacc`, {
      id: accid,
      key: privatekey,
    });
    console.log(data.data.success);

    deleteDocDatabase();
  }

  function loadProfile() {
    // authuser()
    const logout = () => {
      auth.signOut();
    };

    return (
      <div>
        <div 
          style={{
            display: "flex",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
            padding: "70px 50px",
          }}
        >
        <ThemeProvider theme={darkTheme}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Card
                className="card-profile"
                elevation={2}
                sx={{
                  // width: {xs: '230px', sm: '50%'},
                  // maxWidth: 345,
                  height: "70vh",
                  display: "grid",
                  justifyContent: "center",
                  alignItems: "center",
                  // padding: '50px'
                }}
              >
                <CardContent>
                  <Avatar
                    src={user.photoURL}
                    className="avatar-media"
                    sx={{
                      width: "200px",
                      height: "200px",
                      margin: "10px auto",
                    }}
                  />
                </CardContent>
                <CardContent
                  sx={{
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h2" className="heading-list">
                    {user.displayName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {user.email}
                  </Typography>
                  <div
                    style={{
                      paddingTop: "20px",
                    }}
                  >
                    <Link to="/library" className="navbar-link">
                      <Button
                        size="large"
                        startIcon={<VideoLibraryRounded fontSize="small" />}
                      >
                        Library
                      </Button>
                    </Link>
                    <Link to="/" className="navbar-link">
                      <Button
                        color="error"
                        onClick={logout}
                        startIcon={<Logout fontSize="small" />}
                        size="large"
                      >
                        Logout
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText
                        className="listtext"
                        primary="Account ID"
                        secondary={accid}
                      />
                    </ListItem>
                    <Divider />
                    <Divider />
                    <ListItem>
                      <ListItemText
                        className="listtext"
                        primary="Account Balance"
                        secondary={accbal}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        className="listtext"
                        primary="No of items bought"
                        secondary={lib}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        className="listtext"
                        primary="Account Creation Date"
                        secondary={createDate}
                      />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions
                  sx={{
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Button
                    onClick={handleClickOpen}
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete Account
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to delete your account?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>
                        Cancel
                      </Button>
                      <div className="navbar-link">
                        <Button color="error" onClick={deleteAccount}>
                          Delete
                        </Button>
                      </div>
                    </DialogActions>
                  </Dialog>
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
            <button onClick={()=>delacc()} >delete</button>
            {/* <Card.Link href="/" onClick={logout}>
              Logout
            </Card.Link> */}
            {/* <Button onClick={logout}>Logout</Button>
          </Card.Body>
        </Card> */}
          </Grid>
        </ThemeProvider>
        </div>
      </div>
    );
  }

  return <>{loading ? <h1>loading...</h1> : user ? loadProfile() : <Home />}</>;
}
