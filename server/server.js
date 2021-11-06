const express = require('express')

const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
} = require('@hashgraph/sdk')

const dotenv = require("dotenv").config()

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

async function main() {
  //Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = "0.0.2908785";
  const myPrivateKey = "302e020100300506032b65700422042076644d092a7f9758134d24f91d0e3f25c5998b1d483625473c9a5aa69f177d24";

  // If we weren't able to grab it, we should throw a new error
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }

  // Create our connection to the Hedera networkrs
  
  // The Hedera JS SDK makes this really easy!
  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);

  //Create the account balance query
  const query = new AccountBalanceQuery().setAccountId(myAccountId);

  //Submit the query to a Hedera network
  const accountBalance = await query.execute(client);

  //Print the balance of hbars
  console.log(
    "The hbar account balance for this account is " + accountBalance.hbars
  );

  //v2.0.7

  app.get("/createAccount", async (req, res) => {
    //Create new keys
    const newAccountPrivateKey = await PrivateKey.generate();
    console.log(newAccountPrivateKey);
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    //Create a new account with 1,000 tinybar starting balance
    const newAccountTransactionResponse = await new AccountCreateTransaction()
      .setKey(newAccountPublicKey)
      .setInitialBalance(new Hbar(1))
      .execute(client);

    // Get the new account ID
    const getReceipt = await newAccountTransactionResponse.getReceipt(client);
    const newAccountId = getReceipt.accountId;
    console.log("The new account ID is: " + newAccountId);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      status: "success",
      id: `${newAccountId}`,
      privatekey: `${newAccountPrivateKey}`,
      publickey: `${newAccountPublicKey}`
    });
  });

}
main();

app.listen(8000, () => {
  console.log("SERVER RUNNING ON PORT 8000...");
});
