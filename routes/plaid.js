const express = require('express')
const router = express.Router()
const plaid = require('plaid')
const moment = require('moment')
const Items = require('../models/Items')
const Accounts = require('../models/Accounts')

const client = new plaid.Client(
    process.env.PLAID_CLIENT_ID,
    process.env.PLAID_SECRET,
    process.env.PLAID_PUBLIC_KEY,
    plaid.environments[process.env.PLAID_ENV],
    { version: "2019-05-29", clientApp: "Plaid Quickstart" }
);

router.post('/link', (req, res) => {
    let PUBLIC_TOKEN = req.body.public_token // get Public token from PlaidLink on the client side
    client.exchangePublicToken(PUBLIC_TOKEN, (error, tokenResponse) => {
        const ACCESS_TOKEN = tokenResponse.access_token;
        const ITEM_ID = tokenResponse.item_id;
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
                            itemId: ITEM_ID,
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
                    }
                })
            })
            client.getAccounts(ACCESS_TOKEN, (err, result) => {
                const accounts = result.accounts
                console.log(accounts)
                accounts.map(
                    account => 
                        Accounts.findOne({'userId': '5e62dcfeadbd5109fecf0ddb', 'accountId': account.account_id}, (err, acc) => {
                            if(!acc){
                                // new Accounts({
                                //     userId: '5e62dcfeadbd5109fecf0ddb',
                                //     itemId: ITEM_ID,
                                //     accountId: account.account_id,
                                //     mask: account.mask,
                                //     balances: account.balances,
                                //     name: account.name,
                                //     officialName: account.official_name,
                                //     subtype: account.subtype,
                                //     type: account.type
                                // }).save(function(err){
                                //     if(err){
                                //         console.log(err);
                                //         return;
                                //     }
                                // }); 
                                console.log('added')
                            }else{
                                console.log('already in system')
                            }   
                        })       
                    )
                console.log(accounts)
            })
      });
})

module.exports = router;


