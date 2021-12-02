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
    Grid
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"

const darkTheme = createTheme({
    palette:{
      mode: "dark",
    },
});

export default function About() {
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

    return (
      <div
        style={{
            minHeight: '90vh',
            padding: '70px 50px'
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Typography variant="h3" sx={{color: 'white', textAlign: 'center', paddingBottom: '30px'}}>TEAM  ATREUS</Typography>
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
                  <IconButton sx={{color:"white"}} href={`mailto:${member.email}`}>
                    <EmailIcon />
                  </IconButton>
                  <IconButton sx={{color:"white"}} href={member.github}>
                    <GitHubIcon />
                  </IconButton>
                  <IconButton sx={{color:"white"}} href={member.linkedin}>
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
    );
};