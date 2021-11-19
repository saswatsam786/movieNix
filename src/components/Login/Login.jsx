// import ReactDom from "react-dom";
import React, { useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import "./login.css"
import { useHistory } from "react-router-dom"
import { db, auth, provider } from "../../firebase"
import axios from "axios"
// import {
//   Client,
//   PrivateKey,
//   AccountCreateTransaction,
//   AccountBalanceQuery,
//   Hbar,
//   TransferTransaction,
// } from "@hashgraph/sdk"

export default function Login() {
  const history = useHistory()

  // async function createAcc() {
  //   const myAccountId = "0.0.2908785"
  //   const myPrivateKey = "302e020100300506032b65700422042076644d092a7f9758134d24f91d0e3f25c5998b1d483625473c9a5aa69f177d24"
  //   if (myAccountId == null || myPrivateKey == null) {
  //     alert("account id must be present")
  //   }
  //   const client = Client.forTestnet()
  //   client.setOperator(myAccountId, myPrivateKey)

  //   const newAccountPrivateKey = await PrivateKey.generate()
  //   console.log(newAccountPrivateKey)
  //   const newAccountPublicKey = newAccountPrivateKey.publicKey

  //   //Create a new account with 1,000 tinybar starting balance
  //   const newAccountTransactionResponse = await new AccountCreateTransaction()
  //     .setKey(newAccountPublicKey)
  //     .setInitialBalance(new Hbar(1))
  //     .execute(client)

  //   // Get the new account ID
  //   const getReceipt = await newAccountTransactionResponse.getReceipt(client)
  //   const newAccountId = getReceipt.accountId
  //   console.log("The new account ID is: " + newAccountId)
  // }

  const signin = async () => {
    provider.setCustomParameters({ prompt: "select_account" })
    await auth
      .signInWithPopup(provider)
      .catch(alert)
      .then(() => {
        const user = auth.currentUser
        let acc = false
        db.collection("accounts")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              if (doc.data().email === user.email) {
                alert("You already have an account ID.")
                acc = true
              }
            })
            if (acc === false) {
              axios.get("http://localhost:8000/createAccount")
                .then(props => {
                  db.collection("accounts").add({
                    email: user.email,
                    accid: props.data.id,
                    privatekey: props.data.privatekey,
                    publickey: props.data.publickey
                  })
                    .catch(err => {
                      console.log(err)
                    })
                })
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error)
          })


        history.push({
          pathname: "/profile",
        })
      })
  }

  // useEffect( () => {
  //      (user) ?
  //       db.collection("accounts").add({
  //         email : user.email,
  //         accid : ""
  //       }) : console.log("not logged")
  // },[user])

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  // }

  return (
    <div className="bg">
      <div className="holder">
        <Card className="text-center">
          <Card.Header>MovieNix Login</Card.Header>
          <Card.Body>
            <Card.Title>Login/Sign Up</Card.Title>
            <Card.Text>Login or create your account through Google</Card.Text>
            <Button variant="outline-primary" onClick={signin}>
              Login
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">Powered By Google</Card.Footer>
        </Card>
      </div>
    </div>
  )
}
