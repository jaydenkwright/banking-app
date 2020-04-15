import React from 'react'
import styles from './Account.module.css'

export default function Account() {
    return (
        <div>
             <div className={styles.account}>
                <div className={styles.accountTitle}>
                    Plaid Checking
                </div>
                <div className={styles.accountSubtitle}>
                    Plaid Gold Standard 0% Interest Checking 
                </div>
                <div className={styles.balanceAvailable}>
                    $100
                </div>
                <div className={styles.balanceAvailableText}>
                    Available
                </div>
                <div className={styles.balanceCurrent}>
                    $110
                </div>
                <div className={styles.balanceCurrentText}>
                    Current
                </div>
            </div>
        </div>
    )
}
