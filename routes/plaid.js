const express = require('express')
const router = express.Router()
const plaid = require('plaid')
const moment = require('moment')
const Items = require('../models/Items')

const client = new plaid.Client(
    process.env.PLAID_CLIENT_ID,
    process.env.PLAID_SECRET,
    process.env.PLAID_PUBLIC_KEY,
    plaid.environments[process.env.PLAID_ENV],
    { version: "2019-05-29", clientApp: "Plaid Quickstart" }
);

router.post('/', (req, res) => {
    let PUBLIC_TOKEN = req.body.public_token // get Public token from PlaidLink on the client side
    client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
        const ACCESS_TOKEN = tokenResponse.access_token;
        const ITEM_ID = tokenResponse.item_id;
        res.json({
          access_token: ACCESS_TOKEN,
          item_id: ITEM_ID
        });
        console.log(ACCESS_TOKEN);
            client.getItem(ACCESS_TOKEN, (err, result) => {
                const item = result.item
                Items.findOne({'userId': '5e62dcfeadbd5109fecf0ddb', 'institutionId': item.institution_id}, (err, items) => {
                    if(items){
                        console.log('in system')
                    }else{
                         const newItem = new Items({
                             userId: "5e62dcfeadbd5109fecf0ddb",
                             accessToken: ACCESS_TOKEN,
                             itemId: item.item_id,
                             availableProducts: item.available_products,
                             billedProducts: item.billed_products,
                             institutionId: item.institution_id,
                             webhook: item.webhook
                         })
                         newItem.save(function(err){
                             if(err){
                                 console.log(err);
                                 return;
                             }
                         console.log(newItem)
                         }); 
                        console.log('not in system')
                    }
                })
            })
      });
})

module.exports = router;


