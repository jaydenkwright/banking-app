import React from 'react'
import Welcome from './Welcome'
import Item from './Item'
import Transaction from './Transaction'

export default function TransactionDashboard() {
    return (
        <div>
            <Welcome/>
            <Transaction />
            <Item />
        </div>
    )
}
