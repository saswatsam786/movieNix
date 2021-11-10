import { React } from "react";
import {
  Navbar,
  Container,
  Nav,
  FormControl,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./navbar.css";
// import { Link } from "react-router-dom";
// import Login from "../Login/Login"

export default function NavigationBar() {
  const [user] = useAuthState(auth);
  const logout = () => {
    auth.signOut();
    <Link to="/" />
  };

  const authButton = () => {
    if (user) {
      return (
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
              <img
                alt="user profile" 
                src={user.photoURL} 
                className="avatar"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu 
              className="text-center" 
              variant="dark"
              style={
                {
                  width: "300px"
                }
              }
            >
              <Dropdown.ItemText>
                  <img 
                    alt="profile pic" 
                    src={user.photoURL} 
                    style={
                      {
                        width: "150px",
                        borderRadius: "50%",
                        padding: "10px"
                      }
                    }
                  />    
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.ItemText style={{fontSize:"1.5rem"}}>{user.displayName}</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item href="/profile">Dashboard</Dropdown.Item>
              <Dropdown.Item href="/" onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      );
    } else {
      return <Nav.Link href="/login">Login</Nav.Link>;
    }
  };

  return (
    <div>
      <Navbar className="navbar" bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">MovieNix</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Nav.Link href="/browse">Browse</Nav.Link>
              <Nav.Link href="#">Random</Nav.Link>
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
  );
}
