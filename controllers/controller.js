const plaid = require("plaid");
const moment = require("moment");

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY
const PLAID_ENV = process.env.PLAID_ENV

var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

const client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV],
    { version: "2019-05-29", clientApp: "Plaid Quickstart" }
  );
  
  const receivePublicToken = (req, res) => {
    let PUBLIC_TOKEN = req.body.public_token;
    client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      res.json({
        access_token: ACCESS_TOKEN,
        item_id: ITEM_ID
      });
      console.log(tokenResponse);
    });
  };
  
  const getTransactions = (req, res) => {
    let startDate = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    client.getTransactions(
      ACCESS_TOKEN,
      startDate,
      endDate,
      {
        count: 250,
        offset: 0
      },
      function(error, transactionsResponse) {
        res.json(transactionsResponse);
        console.log(transactionsResponse);
        console.log(ACCESS_TOKEN)
      }
    );
  };
  
  module.exports = {
    receivePublicToken,
    getTransactions
  };