const express = require("express");
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const plaid = require('./routes/plaid')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

const { receivePublicToken, getTransactions } = require("./controllers/controller.js");

mongoose.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to databse'))
    .catch(err => console.log(err))

//app.post("/auth/public_token", receivePublicToken);
app.use('/auth/public_token', plaid)

app.get("/transactions", getTransactions);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on ${port}`));