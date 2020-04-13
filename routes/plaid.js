const express = require('express')
const router = express.Router()
const plaid = require('plaid')
const moment = require('moment')
const Items = require('../models/Items')
const Accounts = require('../models/Accounts')
const Transactions = require('../models/Transactions')

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
                    if(!items){
                        client.getInstitutionById(institution_id, (err, result) => {
                            const { name } = result.institution
                            const newItem = new Items({
                                userId: "5e62dcfeadbd5109fecf0ddb",
                                accessToken: ACCESS_TOKEN,
                                itemId: ITEM_ID,
                                availableProducts: available_products,
                                billedProducts: billed_products,
                                institutionName: name,
                                institutionId: institution_id,
                                webhook: webhook
                            })
                            newItem.save((err) => {
                                 if(err){
                                     console.log(err);
                                     return;
                                 }
                                console.log(newItem)
                            });
                        }) 
                        console.log('added')
                    }else{
                        console.log('in system')
                        Items.updateOne({'userId': '5e62dcfeadbd5109fecf0ddb', 'institutionId': institution_id}, 
                            {$set: {
                                accessToken: ACCESS_TOKEN
                            }}, (err, result) => {
                                console.log('updated')
                            })  
                    }
                })
            })
            client.getAccounts(ACCESS_TOKEN, (err, result) => {
                const accounts = result.accounts
                accounts.map(
                    account => 
                        Accounts.findOne({'userId': '5e62dcfeadbd5109fecf0ddb', 'mask': account.mask, 'name': account.name, 'subtype': account.subtype}, (err, acc) => {
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
                                  }).save((err) => {
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
            })
      });
})

router.get('/transactions', (req, res) => {
    Items.findOne({'userId': '5e62dcfeadbd5109fecf0ddb', 'itemId': 'epnnZE9xbKcXZVkLALLvU4vdpPEQp3tLNnn4z'}, (err, items) => {
        const { accessToken, itemId } = items
        const startDate = moment()
            .subtract(60, "days")
            .format("YYYY-MM-DD");
        const endDate = moment().format("YYYY-MM-DD");
        client.getTransactions(
            'access-sandbox-fed2f034-cd3a-4cc7-acc9-25acf327a93c',
            startDate,
            endDate,
            {
                count: 100,
                offset: 0
            },
            (error, transactionResponse) => {
                if(!error){
                    const {transactions, total_transactions} = transactionResponse 
                    Transactions.countDocuments({'userId': '5e62dcfeadbd5109fecf0ddb', 'itemId': itemId}, (err, total) => {
                            console.log(total_transactions)
                            if(total !== total_transactions){
                                // Not all transactions are in the database, therefore it will be sent from Plaid API
                                res.json(transactionResponse)
                                transactions.map(transaction => 
                                    Transactions.findOne({'userId': '5e62dcfeadbd5109fecf0ddb', 'transactionId': transaction.transaction_id},
                                        (err, trans) => {
                                            const {account_id, account_owner, amount, authorized_date, category, category_id, date, iso_currency_code, location, name, payment_channel, pending, transaction_id, transaction_type} = transaction
                                            if(!trans){
                                                //console.log(transaction)
                                                 new Transactions({
                                                    userId: '5e62dcfeadbd5109fecf0ddb',
                                                    itemId: itemId,
                                                    accountId: account_id,
                                                    accountOwner: account_owner,
                                                    amount: amount,
                                                    authorizedDate: authorized_date,
                                                    category: category,
                                                    categoryId: category_id,
                                                    date: date,
                                                    isoCurrencyCode: iso_currency_code,
                                                    location: location,
                                                    name: name,
                                                    paymentChannel: payment_channel,
                                                    pending: pending,
                                                    transactionId: transaction_id,
                                                    transactionType: transaction_type,
                                                }).save((err) => {
                                                    if(err){
                                                        console.log(err);
                                                        return;
                                                    }
                                                }); 
                                                console.log('not in system')
                                            }else{
                                                console.log('in system')
                                            }
                                        }
                                    )
                                )
                            }else{
                                // Retreive transactions database
                                console.log('all transactions in database')
                            }
                    })
                }else{
                    console.log(error)
                }
            }
        );
    })
})

module.exports = router;


