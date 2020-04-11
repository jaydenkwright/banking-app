const express = require("express");
const dotenv = require('dotenv')
dotenv.config()
const app = express();

app.use(express.json());

const { receivePublicToken, getTransactions } = require("./controllers/controller.js");

app.post("/auth/public_token", receivePublicToken);

app.get("/transactions", getTransactions);

const port = process.env.PORT || 5000
app.listen(port, () => {
console.log(`Server running on ${port}`);
});