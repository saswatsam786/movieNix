import React from 'react'
import {
    Box,
    Container,
    Grid,
    Typography,
    Avatar,
    IconButton
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom'
import './footer.css'


export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    const redirect =()=> {
        window.location.href = 'https://hedera.com/';
    }

    return (
        <Box sx={{ bgcolor: 'rgb(23, 23, 23)', height: 'auto', width: '100%', marginBottom: 0, color: 'white'}}>
            <Box sx={{ bgcolor: 'rgb(33, 31, 37)', height: 'auto', width: '100%', margin: 0}}>
                <Container fixed>
                    <Grid container spacing={2}>
                        <Grid item xs={3} md={3} sx={{padding: '10px'}} className='footer-text second'>
                            <Link to='/' className='navbar-link'>
                                <Typography variant='button'>
                                    MovieNix
                                </Typography>
                            </Link>
                            <br />
                            <Typography variant='caption' color='rgba(150,140,150)'>A movie streaming platform built on the Hedera network</Typography>
                        </Grid>
                        <Grid item xs={3} md={3} sx={{padding: '10px'}} className='footer-text second'>
                            <Link to='/about' className='navbar-link'>
                                <Typography variant='caption'>ABOUT US</Typography> <br /> <br />
                            </Link>
                            <Link onClick={redirect} className='navbar-link'>
                                <Typography variant='caption'>ABOUT HEDERA</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={3} md={3} sx={{padding: '10px'}} className='footer-text second'>
                            <Typography variant='caption'>VIEW THE PROJECT ON GITHUB</Typography> <br />
                            <IconButton sx={{color:"white"}} href="https://github.com/saswatsam786/movieNix">
                                <GitHubIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={3} md={3} sx={{padding: '10px'}} className='footer-text second'>
                            <Typography variant='caption'>POWERED BY HEDERA</Typography> <br />
                            <IconButton href="https://hedera.com/">
                                <Avatar
                                    className='hedera-icon'
                                    alt="Hedera"
                                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/4642.png" 
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Typography style={{textAlign: 'center'}} variant="body2" >©{year}</Typography>
        </Box> 
    );
};
