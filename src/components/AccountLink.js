import React, { useState, useEffect } from 'react'
import { PlaidLink } from 'react-plaid-link';
import styles from './styles/Link.module.css'
import axios from 'axios'
import moment from 'moment'

function AccountLink() {

    const [transactions, setTransactions] = useState([])
    const [loaded, setLoaded] = useState(undefined)

    useEffect(() => {
        axios.get('/plaid/transactions/').then(res => {
            if(res.data){
                setTransactions(res.data.transactions)
                setLoaded(true)
                console.log(res.data)
                // res.data.map(trans => console.log(trans.name))
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

    const displayNumber = (number) => {
        if(number > 0){
            return `$${number}`
        }else{
            return `-$${Math.abs(number)}`
        }
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
