import React, { useEffect } from 'react'
import { auth, db } from '../firebase'

export default function Profile() {

    const user = auth.currentUser

    useEffect(() => {
           (user) ?
           db.collection("accounts").add({
               email : user.email,
               accid : ""
           }) : console.log("not logged")
    },[])

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}