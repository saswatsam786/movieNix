import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
// import { Redirect } from 'react-router'
import Home from '../Home/Home'

export default function Profile() {
    const [user] = useAuthState(auth)
    
    function loadProfile() {
        const logout = () => {
            auth.signOut();
            window.location = "/"
        }

        return (
            <div 
                className="profile-card"
                style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '50px'
                    }
                }
                >
                <Card style={{ maxWidth: '300px' }}>
                <Card.Img variant="top" src={auth.currentUser.photoURL} />
                <Card.Body>
                    <Card.Title>{auth.currentUser.displayName}</Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Deleniti dolor aperiam ullam fuga, natus quis iusto architecto 
                        a itaque facere.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{user.email}</ListGroupItem>
                    <ListGroupItem>some information</ListGroupItem>
                    <ListGroupItem>Account Id</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="/">Home</Card.Link>
                    <Card.Link href="/" onClick={logout}>Logout</Card.Link>
                    {/* <Button onClick={logout}>Logout</Button> */}
                </Card.Body>
                </Card>
            </div>
        )
    }

    return user ? loadProfile() : <Home />
}
