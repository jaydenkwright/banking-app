import React, { useState, useEffect } from 'react'
import { PlaidLink } from 'react-plaid-link';
import styles from './Link.module.css'
import axios from 'axios'
import moment from 'moment'

function Link() {

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
            {/* <PlaidLink
                clientName="React Plaid Setup"
                env="sandbox"
                product={["auth", "transactions"]}
                publicKey="b10f8bce201300b78c84d445ac5abf"
                onExit={handleOnExit}
                onSuccess={handleOnSuccess}
                className="test"
            >
                Open Link and connect your bank!
            </PlaidLink> */}
            <div className={styles.welcome}>
                Welcome,
                <div>Andy</div>
            </div>
            <div className={styles.account}>
                <div className={styles.accountTitle}>
                    Plaid Checking
                </div>
                <div className={styles.accountSubtitle}>
                    Plaid Gold Standard 0% Interest Checking 
                </div>
                <div className={styles.balanceAvailable}>
                    $100
                </div>
                <div className={styles.balanceAvailableText}>
                    Available
                </div>
                <div className={styles.balanceCurrent}>
                    $110
                </div>
                <div className={styles.balanceCurrentText}>
                    Current
                </div>
            </div>
            <div className={styles.titles}>
                Transactions
            </div>
            <div className={styles.transaction}>
                <div className={styles.row}>
                    <div className={styles.transactionTitle}>
                        United Airlines
                    </div>
                    <div className={styles.transactionPrice}>
                        $450
                    </div>
                </div>
                <div className={styles.row2}>
                    <div className={styles.category}>
                        Travel
                    </div>
                    <div className={styles.date}>
                        2hr Ago
                    </div>
                </div>
            </div>
            {
                transactions.map(transaction => 
                    <div className={styles.transaction}>
                        <div className={styles.row}>
                            <div className={styles.transactionTitle}>
                                {transaction.name}
                            </div>
                            <div className={transaction.amount > 0 ? styles.transactionPrice : styles.transactionPriceRed}>
                                {displayNumber(transaction.amount)}
                            </div>
                        </div>   
                        <div className={styles.row2}>
                            <div className={styles.category}>
                                {transaction.category[0]}
                            </div>
                            <div className={styles.date}>
                                {moment(transaction.date, "YYYYMMDD").fromNow()}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Link;
