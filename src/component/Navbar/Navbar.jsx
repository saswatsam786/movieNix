import {React, useState, cloneElement} from 'react';
import { styled, alpha, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { ThemeProvider } from '@emotion/react';
import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavigationBar(props) {
  const [user] = useAuthState(auth)
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const menuId = 'primary-search-account-menu';

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const logout = () => {
    auth.signOut()
  }
  
  function ElevateOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        // keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
      <MenuItem><Link to='/profile' className='navbar-link'>Profile</Link></MenuItem>
      <MenuItem><Link to='/profile' className='navbar-link'>Library</Link></MenuItem>
      <MenuItem onClick={logout}><Link to='/' className='navbar-link'>Logout</Link></MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1}}>
      <ThemeProvider theme={darkTheme}>
      <ElevateOnScroll>
      <AppBar position="fixed" className='navbar-transperant'>
        <Toolbar>
        <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <NavLink
              to='/'
              className="navbar-link"
            >
            MovieNix  
            </NavLink>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          {
            user ? (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt={user.displayName} 
                    src={user.photoURL} 
                    sx={{ width: 30, height: 30 }}
                  >
                  </Avatar>
                </IconButton>
              </Box>
            ) : (
              <Button color="inherit"><NavLink to='/login' className="navbar-link">Login</NavLink></Button>
            )
          }
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
            size="large"
            aria-label="show more"
            // aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
            >
            <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      </ElevateOnScroll>
      {renderMenu}
      </ThemeProvider>
    </Box>
  );
}
