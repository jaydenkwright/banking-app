import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import styles from './styles/Transaction.module.css'
import {displayNumber} from './functions'
import axios from 'axios'

export default function Transaction() {
    const [transactionData, setTransactionData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [category, setCategory] = useState('')
    const { id } = useParams()
    const getTransaction = async () => {
        const res = await axios.get(`/plaid/transaction/${id}`)
        console.log(res.data)
        setCategory(res.data.transaction.category[0])
        setLoaded(true)
        setTransactionData(res.data.transaction)
    }

    useEffect(() => {
        getTransaction()
    })

    const { name, amount } = transactionData
    return (
        <div>
            {loaded ? 
                <div className={styles.transaction}>
                    <div className={styles.transactionTitle}>
                            {name}
                    </div>
                    <div className={styles.row}>
                        <div className={styles.category}>
                            {category}
                        </div>
                        <div className={amount > 0 ? styles.transactionPriceRed : styles.transactionPrice}>
                            {displayNumber(amount)}
                        </div>
                    </div>
                </div>
            : null}
        </div>
    )
}
