import React from 'react'
import Account from './Account'
import Transactions from './Transactions'
import Item from './Item'
import styles from './AccountDashboard.module.css'

export default function AccountDashboard() {
    return (
        <div>
             <div className={styles.welcome}>
                Welcome,
                <div>Andy</div>
            </div>
            <Item/>
            <Account />
            <Transactions />
        </div>
    )
}
