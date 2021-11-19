import React, { useEffect, useState } from "react"
import {
  Navbar,
  Container,
  Nav,
  FormControl,
  Form,
  Button,
  Dropdown,
  NavDropdown,
} from "react-bootstrap"
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, NavLink } from "react-router-dom"
import "./navbar.css"
import search from "../../pages/Search/Searchfunc"
import axios from "axios"

export default function NavigationBar() {
  const [user] = useAuthState(auth)
  const [searchText, setSearchText] = useState("")
  const [movies, setMovies] = useState([])
  const logout = () => {
    auth.signOut()
  }

  const authButton = () => {
    if (user) {
      return (
        <Nav>
          <Dropdown drop="down" align="end">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <img alt="user profile" src={user.photoURL} className="avatar" />
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="text-center"
              variant="dark"
              style={{
                width: "300px",
              }}
            >
              <Dropdown.ItemText>
                <img
                  alt="profile pic"
                  src={user.photoURL}
                  style={{
                    width: "150px",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                />
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.ItemText style={{ fontSize: "1.5rem" }}>
                {user.displayName}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item>
                <NavLink
                  to="/profile"
                  style={(isActive) => ({
                    color: isActive ? "cyan" : "grey",
                    textDecoration: "none",
                  })}
                >
                  Dashborad
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>
                <NavLink
                  to="/"
                  style={(isActive) => ({
                    color: isActive ? "grey" : "grey",
                    textDecoration: "none",
                  })}
                >
                  Logout
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      )
    } else {
      return (
        <Nav.Link>
          <NavLink
            to="/login"
            style={(isActive) => ({
              color: isActive ? "cyan" : "grey",
              textDecoration: "none",
            })}
          >
            Login
          </NavLink>
        </Nav.Link>
      )
    }
  }

  const fetchSearch = async () => {
    const req = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=cbf737bde1c9e7ccdf0c6e059d3adb7b&language=en-US&query=${searchText}&page=1&sort_by=popularity.desc`
    )
    setMovies(req.data.results)
    console.log(movies)
  }

  useEffect(() => {
    fetchSearch()
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
      &#x25bc;
    </div>
  ))

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          {searchText && search(movies[0])}
        </div>
      )
    }
  )

  return (
    <div>
      <Navbar
        className="navbar"
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand>
            <NavLink
              to="/"
              style={(isActive) => ({
                color: isActive ? "White" : "White",
                textDecoration: "none",
              })}
            >
              MovieNix
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Nav.Link>
                <NavLink
                  to="/search"
                  style={(isActive) => ({
                    color: isActive ? "cyan" : "grey",
                    textDecoration: "none",
                  })}
                >
                  Browse
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  to="/random"
                  style={(isActive) => ({
                    color: isActive ? "cyan" : "grey",
                    textDecoration: "none",
                  })}
                >
                  Random
                </NavLink>
              </Nav.Link>
            </Nav>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                Search
              </Dropdown.Toggle>

              {searchText && movies ? (
                <Dropdown.Menu>
                  <Dropdown.Item eventkey="1">
                    {searchText && search(movies[0])}
                  </Dropdown.Item>
                  <Dropdown.Item eventkey="2">
                    {searchText && search(movies[1])}
                  </Dropdown.Item>
                  {/* <Dropdown.Item eventkey="2">{searchText && search(movies[2])}</Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item eventkey="2">
                    {searchText && <Link to="/search">View more...</Link>}
                  </Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu>
                  <Dropdown.Item>NO related content</Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>

            <Nav>{authButton()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
