import React, { useEffect } from 'react'
import Account from './Account'
import Transactions from './Transactions'
import Item from './Item'
import Chart from './Chart'
import Welcome from './Welcome'
import styles from './styles/AccountDashboard.module.css'

export default function AccountDashboard() {
    return (
        <div>
            <Welcome />
            <Account/>
            <Transactions/>
        </div>
    )
}
