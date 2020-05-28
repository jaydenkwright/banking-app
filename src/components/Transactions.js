import React, { useState, useEffect } from 'react'
import { useParams,Link } from "react-router-dom";
import styles from './styles/Transactions.module.css'
import {displayNumber, shortenString} from './functions'
import axios from 'axios'
import moment from 'moment'

export default function Transactions() {
    const [transactions, setTransactions] = useState([])
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams()
    const getTransactions = async () => {
        const res = await axios.get(
            id ? `/plaid/transactions/${id}` :
            `/plaid/transactions`, {
                'withCredentials': true
            }
        )
        setTransactions(res.data.transactions)
        setLoaded(true)
        console.log(res.data.transactions)
    }

    useEffect(() => {
        getTransactions()
    }, [])


    return (
        <div>
            <div className={styles.titles}>
                Transactions
            </div>
            {loaded ? 
                <div>
                    {
                        transactions.map(transaction => 
                            <div className={styles.transaction} id="transactions">
                                <div className={styles.row}>
                                    <div className={styles.transactionTitle}>
                                        <Link className={styles.link} to={`/transaction/${transaction.transaction_id}`}>{shortenString(transaction.name, 19)}</Link>
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
