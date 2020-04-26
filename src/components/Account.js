import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import styles from './styles/Account.module.css'
import axios from 'axios'

export default function Account() {
    const [account, setAccount] = useState([])
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams()
    const getAccount = async () => {
        const res = await axios.get(
            id ? `/plaid/account/${id}` :
            `/plaid/account`
        )
        setAccount(res.data.account)
        setLoaded(true)
        console.log(res.data)
    }
    useEffect(() => {
        getAccount()
    }, [])
    const {name, officialName, balances} = account
    return (
        <div>
            {loaded ? 
                <div className={styles.account}>
                    <div className={styles.accountTitle}>
                        {name}
                    </div>
                    <div className={styles.accountSubtitle}>
                        {officialName} 
                    </div>
                    <div className={styles.balanceAvailable}>
                        ${balances?.available}
                    </div>
                    <div className={styles.balanceAvailableText}>
                        Available
                    </div>
                    <div className={styles.balanceCurrent}>
                        ${balances?.current}
                    </div>
                    <div className={styles.balanceCurrentText}>
                        Current
                    </div>
                </div>
            : null }
        </div>
    )
}
