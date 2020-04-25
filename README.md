## Overview

Budgeting app built with ReactJS, NodeJs, Express, and Mongoose. This application uses Plaid API to allow users to link bank accounts from various institutions to view and analyze transaction data. 

## Usage

- Users login with an email and password
- Users link a bank account through the Plaid Link API
- - Public token is sent from client to `/plaid/link` route on the server and exchange for access token
- - Access token is used to retrieve Bank information, account names & balances, and transactions
- - Info is saved in MongoDB and updated through the API when there is new data
- User banking data can be access using fetch requests to the `/plaid/` route
- - `/plaid/transactions` - Retrieve transactions from specific item
- - `/plaid/transactions/:accountId` - Retrieve transactions from specific account
- - `/plaid/transaction/:id` - Get individual transaction from transaction ID
- - `/plaid//item/:id` - Retrieve information on specific item
- - `/plaid/account/:id` - Retrieve information on specific account

