import React, { useState, useEffect } from 'react'
import styles from './Transactions.module.css'
import axios from 'axios'
import moment from 'moment'

export default function Transactions() {
    const [transactions, setTransactions] = useState([])
    const [loaded, setLoaded] = useState(false)

    const getTransactions = async () => {
        const res = await axios.get('/plaid/transactions/wPZZrE4XgLuzJvA8b88EhZmKgzgL36trzPLrV')
        setTransactions(res.data.transactions)
        setLoaded(true)
    }

    useEffect(() => {
        getTransactions()
    }, [])

    const displayNumber = (number) => {
        if(number > 0){
            return `-$${number}`
        }else{
            return `+$${Math.abs(number)}`
        }
    }

    return (
        <div>
            {loaded ? 
                <div>
                    <div className={styles.titles}>
                        Transactions
                    </div>
                    {
                        transactions.map(transaction => 
                            <div className={styles.transaction}>
                                <div className={styles.row}>
                                    <div className={styles.transactionTitle}>
                                        {transaction.name}
                                    </div>
                                    <div className={transaction.amount > 0 ? styles.transactionPriceRed : styles.transactionPrice}>
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
            : null}
        </div>
    )
}
