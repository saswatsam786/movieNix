import React from 'react'
import {
    Button, 
    Card,
    CardContent,
    CardActions,
    Avatar,
    // IconButton,
    Box,
    Typography,
    Stack,
    Divider,
} from '@mui/material'
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
});

export default function About() {
    return (
      <div
        style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh',
            padding: '70px 50px'
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Stack spacing={2}>
          <Typography variant="h4" sx={{color: 'white'}}>TEAM  ATREUS</Typography>
          <Card elevation={2} sx={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
              }}
            >
              <Avatar 
                sx={{ width: 60, height: 60 }}
              />
            </div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="h5" component="div" sx={{mb: 1.5}}>
                Piyush Mishra
              </Typography>
              <Divider sx={{mb: 1}}/>
              <Typography variant="subtitle1">
                CSE 2nd Year
              </Typography>
              {/* <Typography color="text.secondary">
                piyushmishra965@gmail.com
              </Typography> */}
            </CardContent>
            <CardActions>
              <Button size="small">Mail</Button>
              <Button size="small">Github</Button>
              <Button size="small">LinkedIn</Button>
            </CardActions>
            </Box>
          </Card>
          </Stack>
        </ThemeProvider>
      </div>
    );
}
