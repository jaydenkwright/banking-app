import React, { useState, useEffect } from 'react'
import styles from './Account.module.css'
import axios from 'axios'

export default function Account() {
    const [account, setAccount] = useState([])
    const [loaded, setLoaded] = useState(false)
    const getAccount = async () => {
        const res = await axios.get('/plaid/account/wPZZrE4XgLuzJvA8b88EhZmKgzgL36trzPLrV')
        setAccount(res.data.account)
        setLoaded(true)
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
