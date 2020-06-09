import React from 'react'
import Account from './Account'
import Transactions from './Transactions'
import Welcome from './Welcome'
import styles from './styles/AccountDashboard.module.css'

export default function AccountDashboard() {
    return (
        <div>
            <Welcome />
            <Account/>
            <div className={styles.transactions}>
                <Transactions/>
            </div>
        </div>
    )
}
