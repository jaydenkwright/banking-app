import React, { useState, useEffect } from 'react'
import { PlaidLink } from 'react-plaid-link';
import axios from 'axios'

function Link() {

    const [transactions, setTransactions] = useState([])
    const [loaded, setLoaded] = useState(undefined)

    useEffect(() => {
        axios.get('/transactions').then(res => {
            if(res.data){
                setTransactions(res.data.accounts[1])
                setLoaded(true)
                console.log(res.data)
            }
            //console.log(transactions)
        })
    }, [])

    const handleOnSuccess = (public_token, metadata) => {
        axios.post('/plaid/link', {
            public_token: public_token
        })
    }

    const handleOnExit = () => {
        console.log('exit')
    }

    const handleClick = (res) => {
        axios.get('/transactions').then(res => {
            setTransactions(res.data.accounts[1])
            setLoaded(true)
            console.log(res.data.accounts[1].balances.available)
            console.log(transactions)
        })
    }

    return (
        <div>
            <PlaidLink
                clientName="React Plaid Setup"
                env="sandbox"
                product={["auth", "transactions"]}
                publicKey="b10f8bce201300b78c84d445ac5abf"
                onExit={handleOnExit}
                onSuccess={handleOnSuccess}
                className="test"
            >
                Open Link and connect your bank!
            </PlaidLink>
            <div>
                <button onClick={handleClick}>Get Transactions</button>
            </div>
            {transactions.name}
            {transactions.official_name}
            {transactions.subtype}
            {loaded ? transactions.balances.available : null}
        </div>
    )
}

export default Link;
