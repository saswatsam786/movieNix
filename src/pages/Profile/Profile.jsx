import { Button } from 'react-bootstrap'
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
            <div>
                <h1>Welcome {user.displayName}</h1>
                <Button onClick={logout}>Logout</Button>
            </div>
        )
    }

    return user ? loadProfile() : <Home />
}
