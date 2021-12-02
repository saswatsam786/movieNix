//eslint-disable-next-line
import { createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
  Card,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Logout,
  AccountCircle,
  VideoLibraryRounded,
} from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./navbar.css";
import SearchField from "./SearchField";

export default function NavigationBar(props) {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isTransparent, setTransparent] = useState("false");
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      if (show) {
        setTransparent(!isTransparent);
      } else {
        setTransparent("false");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const logout = () => {
    auth.signOut();
  };

  var displayName, photo;

  if (user) {
    displayName = user.displayName;
    photo = user.photoURL;
  } else {
    displayName = null;
    photo = null;
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        elevation: 1,
        sx: {
          width: 250,
          overflow: "visible",
          alignItems: "center",
          justifyContent: "center",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      onClose={handleMenuClose}
      open={isMenuOpen}
    >
      <Card
        style={{
          maxWidth: "250px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <Avatar
          alt={displayName}
          src={photo}
          sx={{ width: 45, height: 45 }}
        ></Avatar>
        <Typography variant="h6" component="div">
          {displayName}
        </Typography>
        <br />
      </Card>
      <Divider />
      <Link to="/profile" className="navbar-link">
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
            Profile
        </MenuItem>
      </Link>

      <Link to="/library" className="navbar-link">
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <VideoLibraryRounded fontSize="small" />
          </ListItemIcon>
          Library
        </MenuItem>
      </Link>

      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <Link to="/" className="navbar-link" onClick={logout}>
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <Avatar
              alt={displayName}
              src={photo}
              sx={{ width: 45, height: 45 }}
            ></Avatar>
          </ListItemIcon>
          <ListItemText primary={displayName} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link to="/profile" className="navbar-link">
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link to="/library" className="navbar-link">
          <ListItem button>
            <ListItemIcon>
              <VideoLibraryRounded />
            </ListItemIcon>
            <ListItemText primary="Library" />
          </ListItem>
        </Link>
        <Link to="/" className="navbar-link">
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar
          position="fixed"
          color={isTransparent ? "transparent" : "default"}
          className={isTransparent ? "navbar-transparent" : "navbar-solid"}
        >
          <Toolbar>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <NavLink to="/" className="navbar-link">
                MovieNix
              </NavLink>
            </Typography>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {(window.location.pathname !== "/profile" || window.location.pathname !== "/login") && <SearchField />}
            {user ? (
              <>
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
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
                      alt={displayName}
                      src={photo}
                      sx={{ width: 30, height: 30 }}
                    ></Avatar>
                    {/* <AccountCircle /> */}
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    // aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    // onClick={handleMobileMenuOpen}
                    onClick={toggleDrawer(true)}
                    color="inherit"
                  >
                    <MenuIcon style={{ color: "white" }} />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={state}
                    onClose={toggleDrawer(false)}
                  >
                    {list()}
                  </Drawer>
                </Box>
              </>
            ) : (
              <Button color="inherit">
                <NavLink to="/login" className="navbar-link">
                  Login
                </NavLink>
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}
      </ThemeProvider>
    </Box>
  );
}