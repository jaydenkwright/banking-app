const express = require('express')
const router = express.Router()
const plaid = require('plaid')
const moment = require('moment')
const Items = require('../models/Items')
const Accounts = require('../models/Accounts')
const Transactions = require('../models/Transactions')
const verify = require('./middleware/verifyToken')

const client = new plaid.Client(
    process.env.PLAID_CLIENT_ID,
    process.env.PLAID_SECRET,
    process.env.PLAID_PUBLIC_KEY,
    plaid.environments[process.env.PLAID_ENV],
    { version: "2019-05-29", clientApp: "Plaid Quickstart" }
);
// 5ea6245e1d0a926f67a158db
// 5e62dcfeadbd5109fecf0ddb

// @route   POST /plaid/link
// @desc    Exchange public token with with Plaid API to retrieve ACCESS_TOKEN
// @access  private
router.post('/link', verify, (req, res) => {
    const { id } = req.user
    let PUBLIC_TOKEN = req.body.public_token // get Public token from PlaidLink on the client side
    client.exchangePublicToken(PUBLIC_TOKEN, (error, tokenResponse) => {
        const ACCESS_TOKEN = tokenResponse.access_token;
        const ITEM_ID = tokenResponse.item_id;
        console.log(ACCESS_TOKEN);
            client.getItem(ACCESS_TOKEN, (err, result) => {
                const { available_products,billed_products,institution_id,webhook } = result.item
                Items.findOne({'userId': id, 'institutionId': institution_id}, (err, items) => {
                    if(!items){
                        client.getInstitutionById(institution_id, (err, result) => { 
                            const { name } = result.institution
                            const newItem = new Items({
                                userId: id,
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
                        Items.updateOne({'userId': id, 'institutionId': institution_id}, 
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
                        Accounts.findOne({'userId': id, 'mask': account.mask, 'name': account.name, 'subtype': account.subtype}, (err, acc) => {
                            const { account_id,mask,balances,name,official_name,subtype,type } = account
                            if(!acc){
                                  new Accounts({
                                      userId: id,
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


// @route   GET /plaid/transactions/
// @desc    Retrieve transactions from specific item
// @access  private
router.get('/transactions', verify, (req, res) => {
    const { id } = req.user
    Items.findOne({'userId': id, 'itemId': 'vwRApr3ZqasKqVdjxrNQFbn3R8B9BatWezjRj'}, (err, items) => {
        const { accessToken, itemId } = items
        const startDate = moment()
            .subtract(60, "days")
            .format("YYYY-MM-DD");
        const endDate = moment()
            .format("YYYY-MM-DD");
        client.getTransactions(
            accessToken,
            startDate,
            endDate,
            {
                count: 100,
                offset: 0
            },
            (error, transactionResponse) => {
                if(!error){
                    const {transactions, total_transactions} = transactionResponse 
                    Transactions.countDocuments({'userId': id, 'itemId': itemId}, (err, total) => {
                            if(total !== total_transactions){
                                // Not all transactions are in the database, therefore it will be sent from Plaid API
                                res.json(transactionResponse)
                                transactions.map(transaction => 
                                    Transactions.findOne({'userId': id, 'transactionId': transaction.transaction_id},
                                        (err, trans) => {
                                            const {account_id, account_owner, amount, authorized_date, category, category_id, date, iso_currency_code, location, name, payment_channel, pending, transaction_id, transaction_type} = transaction
                                            if(!trans){
                                                //console.log(transaction)
                                                 new Transactions({
                                                    userId: id,
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
                                            }
                                        }
                                    )
                                )
                            }else{
                                // Retreive transactions database
                                console.log('all transactions in database')
                                Transactions.find({'userId': id, 'itemId': itemId}, (err, transaction) => {
                                   res.json({ transactions: transaction })
                                })
                            }
                    })
                }else{
                    console.log(error)
                }
            }
        );
    })
})


// @route   GET /plaid/transactions/:accountId
// @desc    Retrieve transactions from specific account
// @access  private
router.get('/transactions/:accountId', verify, (req, res) => {
    const { id } = req.user
    const { accountId } = req.params
    Items.findOne({'userId': id, 'itemId': 'vwRApr3ZqasKqVdjxrNQFbn3R8B9BatWezjRj'}, (err, items) => {
        const { accessToken, itemId } = items
        const startDate = moment()
            .subtract(60, "days")
            .format("YYYY-MM-DD");
        const endDate = moment()
            .format("YYYY-MM-DD");
        client.getTransactions(
            accessToken,
            startDate,
            endDate,
            {
                account_ids: [accountId], 
                count: 100,
                offset: 0
            },
            (error, transactionResponse) => {
                if(!error){
                    const {transactions, total_transactions} = transactionResponse 
                    Transactions.countDocuments({'userId': id, 'itemId': itemId, 'accountId': accountId}, (err, total) => {
                            if(total !== total_transactions){
                                // Not all transactions are in the database, therefore it will be sent from Plaid API
                                res.json(transactionResponse)
                                transactions.map(transaction => 
                                    Transactions.findOne({'userId': id, 'transactionId': transaction.transaction_id},
                                        (err, trans) => {
                                            const {account_id, account_owner, amount, authorized_date, category, category_id, date, iso_currency_code, location, name, payment_channel, pending, transaction_id, transaction_type} = transaction
                                            if(!trans){
                                                 new Transactions({
                                                    userId: id,
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
                                            }
                                        }
                                    )
                                )
                            }else{
                                // Retreive transactions database from a certain account
                                Transactions.find({'userId': id, 'itemId': itemId, 'accountId': accountId}, (err, transaction) => {
                                   res.json({ transactions: transaction})
                                })
                            }
                    })
                }else{
                    console.log(error)
                }
            }
        );
    })
})

// @route   GET plaid/transactions/:id
// @desc    Get individual transaction from transaction ID
// @access  private
router.get('/transaction/:id', verify, async (req, res) => {
    const { id } = req.params
    try{
        const transaction = await Transactions.findOne({'userId': req.user.id, 'transactionId': id})
            .then(transaction => res.json({ transaction: transaction }))
    }catch(err){
        console.log(err)
    }

})

// @route   GET /plaid/items/:id
// @desc    Retrieve information on specific item
// @access  private
router.get('/item/:id', verify, async (req, res) => {
    const { id } = req.params
    try{
        const item = await Items.findOne({ 'userId': req.user.id, 'itemId': id})
            .then(item => res.json({ item: item}))
    }catch(err){
        console.log(err)
    }
})

// @route   GET /plaid/accounts/:id
// @desc    Retrieve information on specific account
// @access  private
router.get('/account/:id', verify, async(req, res) => {
    const { id } = req.params
    try{
        Items.findOne({'userId': req.user.id, 'itemId': 'vwRApr3ZqasKqVdjxrNQFbn3R8B9BatWezjRj'}, async (err, item) => {
            const { accessToken } = item
            client.getBalance(accessToken, {account_ids: [id]}, async (err, result) => {
                const { balances } = result.accounts[0]
                const account = await Accounts.findOne({ 'userId': req.user.id, 'accountId': id})
                    .then(account => {
                        if(balances.current === account.balances.current && 
                            balances.available === account.balances.available){
                            res.json({ account: account})
                        }else{
                            res.json({ account: result.accounts[0]})
                            Accounts.updateOne({'userId': req.user.id, 'accountId': id}, {$set: {
                                balances: {
                                    available: balances.available,
                                    current: balances.current
                                }
                            }}, (err, result => {
                            }))
                        }
                    })
            })
        })
    }catch(err){
        console.log(err)
    }
})


module.exports = router;


