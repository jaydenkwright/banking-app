import React from 'react'
import Account from './Account'
import Transactions from './Transactions'
import Item from './Item'
import Chart from './Chart'
import Welcome from './Welcome'
import styles from './AccountDashboard.module.css'

export default function AccountDashboard() {
    return (
        <div>
             <Welcome />
            <Item/>
            <Chart />
        </div>
    )
}
