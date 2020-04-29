import React from 'react'
import Welcome from './Welcome'
import Item from './Item'
import Chart from './Chart'
import Transactions from './Transactions'
import styles from './styles/Dashboard.module.css'

export default function Dashboard() {
    return (
        <div>
            <div className={styles.dashboard}>
                <div className={styles.welcome}>
                    <Welcome />
                </div>
                <div className={styles.item}>
                    <Item />
                </div>
                <div className={styles.chart}>
                    <Chart />
                </div>
                <div className={styles.transactions}>
                    <Transactions />
                </div>
            </div>
        </div>
    )
}
