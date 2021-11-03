import React from "react";
import {Card,ListGroup, ListGroupItem} from 'react-bootstrap';
import {auth, provider, getAuth} from '../../firebase';

export default function Profile() {
    const user = auth.currentUser;
    function loginState(){
        if(user != null){
            return(
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
                    <Card style={{ maxWidth: '500px' }}>
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
                        <ListGroupItem>Cras justo odio</ListGroupItem>
                        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="/">Home</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                    </Card>
                </div>
            );
        }else{
            <div className="error">User not Logged in</div>
        }
    }

    return loginState();
}

