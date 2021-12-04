import React from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Box,
    Typography,
    Divider,
    Grid,
    Button,
} from '@mui/material'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"
import Footer from "../../component/Footer/Footer";
import {Link} from 'react-router-dom';
import "./about.css"

const darkTheme = createTheme({
    palette:{
      mode: "dark",
    },
});

export default function About() {
    function redirectProfile(){
      window.location = "/profile";
    }

    const team = [
      {
        name: 'Piyush Mishra',
        email: 'piyushmishra965@gmail.com',
        github: 'https://github.com/DarthSalad',
        linkedin: 'https://www.linkedin.com/in/piyushmishra965/',
        image: 'https://media-exp1.licdn.com/dms/image/C5603AQGU9zDg2Amwvg/profile-displayphoto-shrink_800_800/0/1619102527407?e=1643846400&v=beta&t=SAlROksnqFLSGY1SzZ7ZTFQrMHn_tmSSprztedT6PfU',
      },
      {
        name: 'Pranav Patel',
        email: 'pranavpatel.pranshu@gmail.com',
        github: 'https://github.com/Pranav0210',
        linkedin: 'https://www.linkedin.com/in/pranav-patel-2821b7208/',
        image: 'https://media-exp1.licdn.com/dms/image/D5635AQGymMEwwHI9Zg/profile-framedphoto-shrink_800_800/0/1633704601184?e=1638442800&v=beta&t=RJjf-_yxL5qygGThABDip09lvlPuTaZYyDyypUIHvSs',
      },
      {
        name: 'Raj Aryan',
        email: 'rj.rajeryan0071@gmail.com',
        github: 'https://github.com/SilverGraph/',
        linkedin: 'https://www.linkedin.com/in/raj-aryan-33aa861b9/',
        image: 'https://media-exp1.licdn.com/dms/image/C4E03AQH8-4kTia5FUA/profile-displayphoto-shrink_800_800/0/1615209011406?e=1643846400&v=beta&t=GzOSFwuahcFIabzrao5Pi7j3GUEP4-ceidXnEz04jKI'
      },
      {
        name: 'Saswat Samal',
        email: 'saswat.sam786@gmail.com',
        github: 'https://github.com/saswatsam786/',
        linkedin: 'https://www.linkedin.com/in/saswatsam/',
        image: 'https://media-exp1.licdn.com/dms/image/C5603AQGVDpql82-UPw/profile-displayphoto-shrink_800_800/0/1615072375647?e=1643846400&v=beta&t=x9M9vo2-jNMCqYMJyL0XgHct6xYpST7YXI9WBRv4jgk'
      },
      {
        name: 'Saurav Pati',
        email: 'sauravpati0407@gmail.com',
        github: 'https://github.com/oyesaurav',
        linkedin: 'https://www.linkedin.com/in/oyesaurav/',
        image: 'https://media-exp1.licdn.com/dms/image/C5603AQFrGoOX8wXzGw/profile-displayphoto-shrink_800_800/0/1612674610419?e=1643846400&v=beta&t=QO3OUuknacTFvlC8geLTjBlad9ncEAUsj_9LqlzSRxg'
      },
    ];

    const features = [
      {
        name: 'Movie Streaming Platform',
        description: 'MovieNix is a movie streaming platform built on the Hedera network using the Hashgraph SDK',
        icon: <MovieCreationIcon />
      },
      {
        name: 'One-Time Buy',
        description: 'Buy a movie through a one-click buy option and watch before it expires in 14 days!',
        icon: <ShoppingCartIcon />
      },
      {
        name: 'Pay Per Second (PPS)',
        description: "Or if you don't want to buy the whole movie, you can watch the movie at 0.01 hbar per second!",
        icon: <img className="hbar" alt="hbar" src="https://hbarprice.com/wp-content/uploads/2019/03/hbarprice-300.png" />
      },
    ]

    return (
      <>
      <div
        style={{
            minHeight: '90vh',
            padding: '70px 50px'
        }}
      >
        <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '30px'
            }}
          >
              <Link className="navbar-link" to="/"><Button sx={{marginRight: '10px'}} variant="outlined">Home</Button></Link>
              {/* <Link className="navbar-link" to="/profile"><Button variant="outlined">Profile</Button></Link> */}
              <Button variant="outlined" onClick={redirectProfile}>Profile</Button>
          </div>
        <ThemeProvider theme={darkTheme}>
        <Typography variant="h4" sx={{color: 'white', textAlign: 'center', padding: '30px'}}>More about MovieNix</Typography>
          <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center',}}>
            {features.map((feature) =>(
              <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      // display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      maxWidth: '400px', 
                      minHeight: '250px'
                    }} 
                    key={feature}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                      <CardContent >
                      <div style={{padding: '10px'}}>{feature.icon}</div>
                        <Typography variant="h5" component="div" sx={{mb: 1.5}}>
                          {feature.name}
                        </Typography>
                        <Divider sx={{mb: 1}}/>
                        <Typography variant="subtitle1" >
                          {feature.description}
                        </Typography>
                      </CardContent>
                      </Box>
                  </Card>
              </Grid>
            ))};
          </Grid>
          <Typography variant="h4" sx={{color: 'white', textAlign: 'center', padding: '30px 10px'}}>TEAM ATREUS</Typography>
          <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center',}}>
          {team.map((member) =>(
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card 
                elevation={2} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  maxWidth: '400px', 
                  minHeight: '200px'
                }} 
                key={member}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px'
                  }}
                >
                  <Avatar
                    src={member.image} 
                    sx={{ width:70, height:70 }}
                  />
                </div>
              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <CardContent >
                  <Typography variant="h5" component="div" sx={{mb: 1.5}}>
                    {member.name}
                  </Typography>
                  <Divider sx={{mb: 1}}/>
                  <Typography variant="subtitle1" sx={{color: 'rgb(170, 170, 170)'}}>
                    CSE 2nd Year
                  </Typography>
                  <Typography variant="caption" sx={{color: 'rgb(170, 170, 170)'}}>
                    IIIT BBSR
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton sx={{color:"white"}} target="_blank" href={`mailto:${member.email}`}>
                    <EmailIcon />
                  </IconButton>
                  <IconButton sx={{color:"white"}} target="_blank" href={member.github}>
                    <GitHubIcon />
                  </IconButton>
                  <IconButton sx={{color:"white"}} target="_blank" href={member.linkedin}>
                    <LinkedInIcon />
                  </IconButton>
                </CardActions>
                </Box>
              </Card>
            </Grid>
          ))};
          </Grid>    
          </ThemeProvider>
      </div>
      <Footer />
      </>
    );
};