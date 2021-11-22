import {React, useState, useEffect} from 'react';
import { styled, alpha, createTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
  Card,
  Drawer,
  // useScrollTrigger,
} from '@mui/material';
import {
  // Settings,
  Logout,
  AccountCircle,
  VideoLibraryRounded
} from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@emotion/react';
// import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import './navbar.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  // marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    visibility: 'show',
    marginLeft: theme.spacing(2),
    width: '300px',
  },
  [theme.breakpoints.down('sm')]: {
    visibility: 'hidden',
  }
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
    padding: theme.spacing(1, 1, 1, 2),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
}));

export default function NavigationBar(props) {
  const [user] = useAuthState(auth)
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTransparent, setTransparent] = useState("false");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  // const [state, setState] = React.useState({right: false});

  // const ToggleClass = () =>{
  //   setTransparent(!isTransparent);
  // };

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setState({ ...state, [anchor]: open });
  // };

  // const list = () => (
  //   <Box
  //     sx={{ width: 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer('right', false)}
  //     onKeyDown={toggleDrawer('right', false)}
  //   >
  //     <Card
  //       style={{
  //         maxWidth: '250px',
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         padding: '5px'
  //       }}
  //     >
  //       <Avatar
  //           alt={user.displayName} 
  //           src={user.photoURL} 
  //           sx={{ width:45, height:45 }}
  //         >
  //       </Avatar>
  //       <Typography variant="h6" component="div">{user.displayName}</Typography><br />
  //     </Card>
  //     <Divider />
  //     <MenuItem onClick={handleMenuClose}>
  //       <ListItemIcon>
  //           <AccountCircle fontSize="small" />
  //       </ListItemIcon>
  //       <Link to='/profile' className='navbar-link'>Profile</Link>
  //     </MenuItem>

  //     <MenuItem onClick={handleMenuClose}>
  //       <ListItemIcon>
  //           <VideoLibraryRounded fontSize="small" />
  //       </ListItemIcon>
  //       <Link to='/profile' className='navbar-link'>Library</Link>
  //     </MenuItem>

  //     <MenuItem onClick={handleMenuClose}>
  //       <ListItemIcon>
  //           <Logout fontSize="small" />
  //       </ListItemIcon>
  //       <Link to='/' className='navbar-link' onClick={logout}>Logout</Link>
  //     </MenuItem>
  //   </Box>
  // );

  
  useEffect(() => {
    const handleScroll = () => {
        const show = window.scrollY > 100
        if (show) {
            setTransparent(!isTransparent)
          }
        else{
          setTransparent('false')
        }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
        document.removeEventListener('scroll', handleScroll)
    }
}, [])

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
  
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const logout = () => {
    auth.signOut()
  }
  
  // function ElevateOnScroll(props) {
  //   const { children, window } = props;
  //   const trigger = useScrollTrigger({
  //     disableHysteresis: true,
  //     threshold: 0,
  //     target: window ? window() : undefined,
  //   });
  
  //   return cloneElement(children, {
  //     elevation: trigger ? 4 : 0,
  //     style: {
  //       backgroundColor: trigger ? "rgba(11, 9, 16, 1)" : "rgba(20, 20, 20, 0)",
  //     }
  //   });
  // }
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 1,
          sx: {
            width: 250,
            overflow: 'visible',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        onClose={handleMenuClose}
        open={isMenuOpen}
    >
      <Card
        style={{
          maxWidth: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5px'
        }}
      >
        <Avatar
            alt={user.displayName} 
            src={user.photoURL} 
            sx={{ width:45, height:45 }}
          >
        </Avatar>
        <Typography variant="h6" component="div">{user.displayName}</Typography><br />
      </Card>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
            <AccountCircle fontSize="small" />
        </ListItemIcon>
        <Link to='/profile' className='navbar-link'>Profile</Link>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
            <VideoLibraryRounded fontSize="small" />
        </ListItemIcon>
        <Link to='/profile' className='navbar-link'>Library</Link>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
            <Logout fontSize="small" />
        </ListItemIcon>
        <Link to='/' className='navbar-link' onClick={logout}>Logout</Link>
      </MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
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
        {/* <AccountCircle /> */}
      </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1}}>
      <ThemeProvider theme={darkTheme}>
      {/* <ElevateOnScroll> */}
      <AppBar position="fixed" color={isTransparent ? "transparent" : "default"} className={isTransparent ? "navbar-transparent" : "navbar-solid"}>
        <Toolbar>
        <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ 
              flexGrow: 1
            }}
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
              <SearchIcon style={{color: "white"}} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              style={{
                color: "white",

            }}
            />
          </Search>
          {
            user ? (
              <>
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
                  {/* <AccountCircle /> */}
                </IconButton>
              </Box>
              </>
            ) : (
              <Button color="inherit"><NavLink to='/login' className="navbar-link">Login</NavLink></Button>
              )
            }
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }} key='right'>
            <IconButton size="large" aria-label="search" color="inherit">
              <SearchIcon style={{color: "white"}} />
            </IconButton>
            <IconButton
            size="large"
            aria-label="show more"
            // aria-controls={mobileMenuId}
            aria-haspopup="true"
            // onClick={handleMobileMenuOpen}
            // onClick={toggleDrawer('right', true)}
            color="inherit"
            >
            <MenuIcon style={{color: 'white'}}/>
            </IconButton>
            {/* <Drawer
              anchor='right'
              open={state['right']}
              onClose={toggleDrawer('right', false)}
            >
              {list}
            </Drawer> */}
          </Box>
        </Toolbar>
      </AppBar>
      {/* </ElevateOnScroll> */}
      {/* {renderMobileMenu} */}
      {renderMenu}
      </ThemeProvider>
    </Box>
  );
}
