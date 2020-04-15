import React from 'react'
import Account from './Account'
import Transactions from './Transactions'
import styles from './Dashboard.module.css'

export default function Dashboard() {
    return (
        <div>
             <div className={styles.welcome}>
                Welcome,
                <div>Andy</div>
            </div>
            <Account />
            <Transactions />
        </div>
    )
}
