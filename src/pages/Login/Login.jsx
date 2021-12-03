import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";
// import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { db, auth, provider } from "../../firebase";
import { useHistory } from "react-router-dom";
import './login.css';
import Footer from "../../component/Footer/Footer";

const darkTheme = createTheme({
  palette:{
    mode: "dark",
  },
});

export default function Login() {
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
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          minHeight: '90vh',
          padding: '20vh 50px'
        }}
      >
        <Card sx={{ minWidth: 270, maxWidth: 700,textAlign: 'center', padding: '20px 70px' }}>
          <CardContent>
            <img 
              alt="MovieNix"
              src="./MovieNix-2.svg"
              style={{
                margin:'auto', 
                padding:'20px', 
                mb: 2
              }} 
            />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              MovieNix
            </Typography>
            <Divider className="divider" sx={{ mb: 2 }} />
            <Typography variant="body2" >
              Login or create your account through Google
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button 
              onClick={signin} 
              size="large" 
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
              }} 
              startIcon={<GoogleIcon />}
            >
              Login
            </Button>
          </CardActions>
          <div sx={{padding: '0px'}}>
            <Typography variant='button' sx={{fontSize: '10px'}}>
              Powered by Google
            </Typography>
          </div>
        </Card>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
