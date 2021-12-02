import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { db, auth, provider } from "../../firebase";
import { useHistory } from "react-router-dom";
// import { margin } from '@mui/system';

function PoweredBy(props) {
  return (
    <Typography variant="body2" color="common.white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Movienix
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginNew() {
  const history = useHistory();

  const signin = async (e) => {
    e.preventDefault();
    provider.setCustomParameters({ prompt: "select_account" });
    await auth
      .signInWithPopup(provider)
      .catch(alert)
      .then(() => {
        const user = auth.currentUser;
        let acc = false;
        db.collection("accounts")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              if (doc.data().email === user.email) {
                alert("You already have an account ID.");
                acc = true;
              }
            });
            if (acc === false) {
              createacc();
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

        setTimeout(() => {
          history.push({
            pathname: "/profile",
          });
        }, 4000);
      });
  };

  async function createacc() {
    const user = auth.currentUser;
    const createAcc = new Date();
    await axios
      .get("https://movienix-backend.herokuapp.com/createAccount")
      .then((props) => {
        db.collection("accounts")
          .add({
            email: user.email,
            accid: props.data.id,
            privatekey: props.data.privatekey,
            publickey: props.data.publickey,
            lib: [],
            accountCreationDate: createAcc.toLocaleDateString(),
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          maxHeight: "100vh !important",
          maxWidth: "100vw !important",
        }}
      >
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
          style={{
            backgroundColor: "rgb(40, 44, 52)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            widht: "100vw",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="common.white">
              Movienix Login/Sign Up
            </Typography>
            <Typography component="h1" variant="h6" color="common.white">
              Login or create your account through Google
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Button
                onClick={signin}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <PoweredBy sx={{ mt: 5, alignSelf: "end" }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
