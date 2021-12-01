import React, {useState} from "react"
import Carousel from "react-bootstrap/Carousel"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from "axios"
import { db, auth, provider } from "../../firebase"
import { useHistory } from "react-router-dom"
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
  )
}

const theme = createTheme()

export default function LoginNew() {
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
              createacc();
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })

        setTimeout(() => {
          history.push({
            pathname: "/profile",
          })
        }, 4000)
      })
  }

  async function createacc() {
    const user = auth.currentUser
    const createAcc = new Date()
    await axios.get("http://localhost:8000/createAccount").then((props) => {
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
          console.log(err)
        })
    })

  }


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ maxHeight: "100vh !important" }}>
        <CssBaseline />
        <Grid item xs={12} sm={4} md={7} sx={{}}>
          <Box
            sx={{
              maxHeight: "100vh",
              minHeight: "100vh",
            }}
          >
            <Carousel fade height="100vh">
              <Carousel.Item style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="d-block w-100 h-100"
                  src=" https://source.unsplash.com/1600x1200/?travel,river"
                  alt="First slide"
                  style={{ objectFit: "cover", margin: "auto 0" }}
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="d-block w-100 h-100"
                  src="https://source.unsplash.com/1600x1200/?travel,tree"
                  alt="Second slide"
                  style={{ objectFit: "cover", margin: "auto 0" }}
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="d-block w-100 h-100"
                  src=" https://source.unsplash.com/1600x1200/?travel,mountain"
                  alt="Third slide"
                  style={{ objectFit: "cover", margin: "auto 0" }}
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ backgroundColor: "rgb(40, 44, 52)" }}
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", flexGrow: 1 }}>
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
  )
}
