import React from 'react'
import Welcome from './Welcome'
import Item from './Item'
import Chart from './Chart'
import Transactions from './Transactions'
import Accounts from './Accounts'
import styles from './styles/Dashboard.module.css'

export default function Dashboard() {
    return (
        <div>
            <Welcome />
            <div className={styles.dashboard}>
                <div className={styles.itemChart}>
                    <Item />
                    <Chart />
                    <Accounts />
                </div>
                <div className={styles.transactions}>
                    <Transactions />
                </div>
            </div>
        </div>
    )
}
