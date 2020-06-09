import React, { useState, useEffect } from 'react'
import { PlaidLink } from 'react-plaid-link';
import axios from 'axios'

function AccountLink() {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        axios.get('/plaid/transactions/').then(res => {
            if(res.data){
                setTransactions(res.data.transactions)
                console.log(res.data)
                // res.data.map(trans => console.log(trans.name))
            }
            //console.log(transactions)
        })
    }, [])

    const handleOnSuccess = (public_token, metadata) => {
        axios.post('/plaid/link', {
            public_token
        })
    }

    const handleOnExit = () => {
        console.log('exit')
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
           
        </div>
    )
}

export default AccountLink;
