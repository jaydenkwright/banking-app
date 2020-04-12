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
                const { available_products,billed_products,institution_id,webhook } = result.item
                Items.findOne({'userId': '5e62dcfeadbd5109fecf0ddb', 'institutionId': institution_id}, (err, items) => {
                    if(items){
                        console.log('in system')
                    }else{
                        client.getInstitutionById(institution_id, (err, result) => {
                            const institution = result.institution
                            const newItem = new Items({
                                userId: "5e62dcfeadbd5109fecf0ddb",
                                accessToken: ACCESS_TOKEN,
                                itemId: ITEM_ID,
                                availableProducts: available_products,
                                billedProducts: billed_products,
                                institutionName: institution.name,
                                institutionId: institution_id,
                                webhook: webhook
                            })
                            newItem.save(function(err){
                                 if(err){
                                     console.log(err);
                                     return;
                                 }
                                console.log(newItem)
                            });
                        }) 
                        console.log('added')
                    }
                })
            })
            client.getAccounts(ACCESS_TOKEN, (err, result) => {
                const accounts = result.accounts
                console.log(accounts)
                accounts.map(
                    account => 
                        Accounts.findOne({'userId': '5e62dcfeadbd5109fecf0ddb', 'accountId': account.account_id}, (err, acc) => {
                            const { account_id,mask,balances,name,official_name,subtype,type } = account
                            if(!acc){
                                  new Accounts({
                                      userId: '5e62dcfeadbd5109fecf0ddb',
                                      itemId: ITEM_ID,
                                      accountId: account_id,
                                      mask: mask,
                                      balances: balances,
                                      name: name,
                                      officialName: official_name,
                                      subtype: subtype,
                                      type: type
                                  }).save(function(err){
                                      if(err){
                                          console.log(err);
                                          return;
                                      }
                                  }); 
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


