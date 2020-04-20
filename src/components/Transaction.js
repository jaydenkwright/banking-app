import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import styles from './styles/Transaction.module.css'
import axios from 'axios'

export default function Transaction() {
    const [transactionData, setTransactionData] = useState([])
    const { id } = useParams()
    const getTransaction = async () => {
        const res = await axios.get(`/plaid/transaction/${id}`)
        console.log(res.data.transaction.name)
        setTransactionData(res.data.transaction)
    }

    useEffect(() => {
        getTransaction()
    }, [])
    return (
        <div>
            <div className={styles.transaction}>
                {transactionData.name}
            </div>
        </div>
    )
}
