const express = require("express");
const cors = require("cors");
const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
} = require("@hashgraph/sdk");

require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

async function main() {
  //Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = process.env.MY_PRIVATE_KEY;

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
      publickey: `${newAccountPublicKey}`,
    });
  });

  app.post("/balance", async (req, res) => {
    try {
      const id = req.body.id;
      const key = req.body.key;
      console.log(id);

      const client = Client.forTestnet();
      client.setOperator(id, key);
      const query = new AccountBalanceQuery().setAccountId(id);
      let accountBalance = await query.execute(client);
      //Print the balance of hbars

      console.log(
        "The hbar account balance for this account is " + accountBalance.hbars
      );
      // const balance = accountBalance.hbars();
      res.status(200).json({
        status: "success",
        data: {
          balance: accountBalance.hbars,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });
}
main();

app.listen(8000, () => {
  console.log("SERVER RUNNING ON PORT 8000...");
});
