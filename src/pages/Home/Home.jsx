// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../firebase";

export default function Home(props) {
    const history = useHistory()
    const [user] = useAuthState(auth)
    
    const func = () =>{
        window.location = "/login";
    }

    // useEffect(() => {
    //     console.log(user);
    // })

    return(
        <div>
            {user === null ? 
                <Button variant="outline-primary" onClick={func}>Login</Button> : 
                <Button variant="outline-primary" onClick={() => {history.push("/profile")}}>Profile</Button>
            }
        </div>
    );
}
// {match:{params:{id}}}
