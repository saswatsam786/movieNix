import React, {useState, useEffect} from 'react'
import { styled, alpha } from "@mui/material/styles"
import {
    InputBase,
    Menu,
    MenuItem,
    IconButton,
    Divider
} from '@mui/material'
import { Dropdown } from "react-bootstrap"
import SearchIcon from '@mui/icons-material/Search'
import search from "../../pages/Search/Searchfunc"
import { Link, useHistory } from 'react-router-dom'
import axios from "axios"

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
    // [theme.breakpoints.down('sm')]: {
    //   visibility: 'hidden',
    // }
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

export default function SearchField(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileEl, setMobileEl] = useState(null);
    
    const [searchText, setSearchText] = useState("")
    const [movies, setMovies] = useState([])
    
    const open = Boolean(anchorEl);
    const mobileOpen = Boolean(mobileEl);
    const history = useHistory()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMobileClick = (event) => {
        setMobileEl(event.currentTarget);
    };
    const handleMobileClose = () => {
        setMobileEl(null);
    };
    
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
            <Search sx={{display: { xs: 'none', sm: 'flex' }}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                autoFocus
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                // onClick={handleClick}
                onChange={(e) => {
                  setSearchText(e.target.value)
                }}
              />
            </Search>
          {children}
        </div>
    ))

    const dropdownId = "basic-menu"
    const renderMobileDropdown = (
            <Menu
                id="basic-menu"
                anchorEl={mobileEl}
                open={mobileOpen}
                onClose={handleMobileClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                disableAutoFocus={true}
                disableEnforceFocus={true}
            >
                <Search autoFocus>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    autoFocus
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value)
                    }}
                  />
                </Search>
                {searchText && movies ? (
                  <>
                    <MenuItem 
                      onClick={() => {
                        handleMobileClose(); 
                        window.location = `/movie/${movies[0].id}`
                      }} 
                      style={{width:"330px"}}
                      eventkey="1"
                    >
                      {searchText && search(movies[0])}
                    </MenuItem>
                    <MenuItem 
                      style={{width:"330px"}}
                      eventkey="2"
                      onClick={() => {
                        handleMobileClose(); 
                        window.location = `/movie/${movies[1].id}`
                      }} 
                    >
                      {searchText && search(movies[1])}
                    </MenuItem>
                    <MenuItem 
                      style={{width:"330px"}}
                      eventkey="3"
                      onClick={() => {
                        handleMobileClose(); 
                        window.location = `/movie/${movies[2].id}`
                      }} 
                    >
                      {searchText && search(movies[2])}
                    </MenuItem>
                    <Divider />
                    <MenuItem 
                      onClick={handleMobileClose} 
                      style={{width:"330px"}}
                      eventkey="4"
                      onKeyDown={(e) => {
                        e.key === "Enter" && (history.push({pathname: '/search', state: {search : searchText}}))
                      }}
                    >
                      {searchText && <Link to={{pathname:'/search', state: {search: searchText}}} className='navbar-link'>View More</Link>}
                    </MenuItem>
                    </>
                ) : (
                    <MenuItem 
                      onClick={handleMobileClose} 
                      style={{width:"300px"}}
                    >
                      No results
                    </MenuItem>
                )}    
                </Menu>
    );

    return(
        <>
            <Dropdown
              className='search-bar'
              aria-controls={dropdownId}
              aria-label="search"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
              </Dropdown.Toggle>

              {searchText && movies ? (
                <Menu
                  // className="dropdown-custom"
                  disableAutoFocus={true}
                  disableEnforceFocus={true}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem 
                    onClick={() => {
                      handleClose(); 
                      window.location = `/movie/${movies[0].id}`
                    }} 
                    style={{width:"300px"}}
                    eventkey="1"
                    // onKeyDown={(e) => {
                    //   e.key === "Enter" &&
                    //     (window.location = `/movie/${movies[0].id}`)
                    // }}
                  >
                    {searchText && search(movies[0])}
                  </MenuItem>
                  <MenuItem 
                    style={{width:"300px"}}
                    eventkey="2"
                    onClick={() => {
                      handleClose(); 
                      window.location = `/movie/${movies[1].id}`
                    }} 
                  >
                    {searchText && search(movies[1])}
                  </MenuItem>
                  <MenuItem 
                    style={{width:"300px"}}
                    eventkey="3"
                    onClick={() => {
                      handleClose(); 
                      window.location = `/movie/${movies[2].id}`
                    }} 
                  >
                    {searchText && search(movies[2])}
                  </MenuItem>
                  <Divider />
                  <MenuItem 
                    onClick={handleClose} 
                    style={{width:"300px"}}
                    eventkey="4"
                    onKeyDown={(e) => {
                      e.key === "Enter" && (history.push({pathname: '/search', state: {search : searchText}}))
                    }}
                  >
                    {searchText && <Link to={{pathname:'/search', state: {search: searchText}}} className='navbar-link'>View More</Link>}
                  </MenuItem>

                  {/* <Dropdown.Item
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
                  {/* <Dropdown.Item eventkey="2">{searchText && search(movies[2])}</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventkey="4"
                    onKeyDown={(e) => {
                      e.key === "Enter" && (history.push({pathname: '/search', state: {search : searchText}}))
                    }}
                  >
                    {searchText && <Link to={{pathname:'/search', state: {search: searchText}}}>View more...</Link>}
                  </Dropdown.Item> */}
                {/* </Dropdown.Menu> */}
              </Menu>
              ) : (
                <Dropdown.Menu className="dropdown-custom">
                  <MenuItem 
                    onClick={handleClose} 
                    style={{width:"300px"}}
                  >
                    No results
                  </MenuItem>
                </Dropdown.Menu>
              )}
            </Dropdown>
            <IconButton 
              // className='mobile-search-icon'
              sx={{display: { xs: 'flex', sm: 'none' }}}
              size="large" 
              aria-controls={dropdownId}
              aria-label="search"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMobileClick}
            >
              <SearchIcon style={{color: "white"}} />
            </IconButton>
            {renderMobileDropdown}
        </>
    );
}