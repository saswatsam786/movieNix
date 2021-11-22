// eslint-disable-next-line
import { styled, alpha, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react"
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  // InputBase,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  // useScrollTrigger,
} from "@mui/material";
import {
  Form,
  FormControl,
  Dropdown,
  // NavDropdown,
} from "react-bootstrap"
// import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from "@emotion/react";
// import MoreIcon from '@mui/icons-material/MoreVert';
// import MenuIcon from '@mui/icons-material/Menu';
// import { AccountCircle } from '@mui/icons-material';
import { Link, NavLink, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import search from "../../pages/Search/Searchfunc"
import axios from "axios"
import "./navbar.css";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

export default function NavigationBar(props) {
  const [user] = useAuthState(auth);
  const [searchText, setSearchText] = useState("")
  const [movies, setMovies] = useState([])
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isTransparent, setTransparent] = useState("false");
  const history = useHistory()

  // const ToggleClass = () =>{
  //   setTransparent(!isTransparent);
  // };

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
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const logout = () => {
    auth.signOut();
  };

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile" className="navbar-link">
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile" className="navbar-link">
          Library
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/" className="navbar-link" onClick={logout}>
          Logout
        </Link>
      </MenuItem>
      {/* <MenuItem>Profile</MenuItem> */}
    </Menu>
  );

  const fetchSearch = async () => {
    const req = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&language=en-US&query=${searchText}&page=1&sort_by=popularity.desc`
    )
    setMovies(req.data.results)
    console.log(movies)
  }

  useEffect(() => {
    fetchSearch()
    // eslint-disable-next-line
  }, [searchText])

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      <Form className="d-flex me-auto">
        <FormControl
          autoFocus
          type="search"
          placeholder="Search..."
          size="sm"
          style={{ backgroundColor: "#282c34", color: "white" }}
          className="me-1"
          aria-label="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
      </Form>
      {children}
      
    </div>
  ))

  // const CustomMenu = React.forwardRef(
  //   ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
  //     return (
  //       <div
  //         ref={ref}
  //         style={style}
  //         className={className}
  //         aria-labelledby={labeledBy}
  //       >
  //         {searchText && search(movies[0])}
  //       </div>
  //     )
  //   }
  // )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        {/* <ElevateOnScroll> */}
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
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon style={{ color: "white" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                style={{ color: "white" }}
              />
            </Search> */}
           <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                {/* Search */}
              </Dropdown.Toggle>

              {searchText && movies ? (
                <Dropdown.Menu align="end">
                  <Dropdown.Item
                    eventkey="1"
                    onKeyDown={(e) => {
                      e.key === "Enter" &&
                        (window.location = `/movie/${movies[0].id}`)
                    }}
                  >
                    {searchText && search(movies[0])}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventkey="2"
                    onKeyDown={(e) => {
                      e.key === "Enter" &&
                        (window.location = `/movie/${movies[1].id}`)
                    }}
                  >
                    {searchText && search(movies[1])}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventkey="3"
                    onKeyDown={(e) => {
                      e.key === "Enter" &&
                        (window.location = `/movie/${movies[2].id}`)
                    }}
                  >
                    {searchText && search(movies[2])}
                  </Dropdown.Item>
                  {/* <Dropdown.Item eventkey="2">{searchText && search(movies[2])}</Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventkey="4"
                    onKeyDown={(e) => {
                      e.key === "Enter" && (history.push({pathname: '/search', state: {search : searchText}}))
                    }}
                  >
                    {searchText && <Link to={{pathname:'/search', state: {search: searchText}}}>View more...</Link>}
                  </Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu>
                  <Dropdown.Item>NO related content</Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {user ? (
              <>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
                    ></Avatar>
                    {/* <AccountCircle /> */}
                  </IconButton>
                </Box>
              </>
            ) : (
              <Button color="inherit">
                <NavLink to="/login" className="navbar-link">
                  Login
                </NavLink>
              </Button>
            )}
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
        {/* </ElevateOnScroll> */}
        {renderMenu}
      </ThemeProvider>
    </Box>
  );
}
