import { React } from "react"
import {
  Navbar,
  Container,
  Nav,
  FormControl,
  Form,
  Button,
  Dropdown,
  Offcanvas,
  NavDropdown
} from "react-bootstrap"
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { NavLink } from "react-router-dom"
import "./navbar.css"
// import { Link } from "react-router-dom";
// import Login from "../Login/Login"

export default function NavigationBar() {
  const [user] = useAuthState(auth)
  const logout = () => {
    auth.signOut()
  }

  const authButton = () => {
    if(user) {
      return(
        <Nav>
          {/* <Nav.Link href="/profile">Dashboard</Nav.Link>
          <Nav.Link href="/" onClick={logout}>Logout</Nav.Link> */}
          {/* <img 
            alt="profileImage"
            src={user.photoURL}
            className="avatar" 
          />
          <NavDropdown
            id="nav-dropdown-dark-example"
            drop="start"
            src={user.photoURL}
            menuVariant="dark"
          >
            <NavDropdown.Item>Dashboard</NavDropdown.Item>
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown> */}
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
              <Dropdown.Item><NavLink
                  to="/profile"
                  style={(isActive) => ({
                    color: isActive ? "cyan" : "grey",
                    textDecoration: "none",
                  })}
                >
                  Dashborad
                </NavLink></Dropdown.Item>
              <Dropdown.Item onClick={logout}><NavLink
                  to="/"
                  style={(isActive) => ({
                    color: isActive ? "grey" : "grey",
                    textDecoration: "none",
                  })}
                >
                  Logout
                </NavLink></Dropdown.Item>
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

  return (
    <div>
      {/* <Navbar bg="custom" variant="dark" fixed="top" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header className="bg-dark" closeButton> 
              <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="bg-dark">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas> */}
          {/* <Nav>{authButton}</Nav> */}
      <Navbar
        className="navbar"
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand><NavLink
            to="/"
            style={(isActive) => ({
              color: isActive ? "White" : "White",
              textDecoration: "none",
            })}
          >
            MovieNix
          </NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Nav.Link>
                <NavLink
                  to="/browse"
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
            <Form className="d-flex me-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-1"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
            <Nav>{authButton()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
