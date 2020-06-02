import React, { useState, useEffect } from 'react'
import styles from './styles/Accounts.module.css'

export default function Accounts() {

    return (
        <div>
            <div className={styles.account}>
                <div className={styles.accountTitle}>
                    Plaid Savings
                </div>
                <div className={styles.accountSubtitle}>
                    Plaid Silver Standard 0.1% Interest Saving
                </div>
            </div>
            <div className={styles.account}>

            </div>
        </div>
    )
}
