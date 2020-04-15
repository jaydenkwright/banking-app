import React from 'react'
import styles from './Transactions.module.css'

export default function Transactions() {
    return (
        <div>
            <div className={styles.title}>
                Transactions
            </div>
            <div className={styles.transaction}>
                <div className={styles.row}>
                    <div className={styles.transactionTitle}>
                        United Airlines
                    </div>
                    <div className={styles.transactionPrice}>
                        $450
                    </div>
                </div>
                <div className={styles.row2}>
                    <div className={styles.category}>
                        Travel
                    </div>
                    <div className={styles.date}>
                        2hr Ago
                    </div>
                </div>
            </div>
        </div>
    )
}
