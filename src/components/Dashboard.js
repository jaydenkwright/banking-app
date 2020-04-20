import React from 'react'
import Welcome from './Welcome'
import Item from './Item'
import Chart from './Chart'
import styles from './styles/Dashboard.module.css'

export default function Dashboard() {
    return (
        <div>
            <Welcome />
            <Item />
            <Chart />
        </div>
    )
}
