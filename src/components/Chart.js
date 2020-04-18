import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Chart.module.css'
import { Bar } from 'react-chartjs-2'


export default function Chart() {
    const [transactionData, setTransactionData] = useState([])
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])
    const getChartData = async () => {
        const res = await axios('/plaid/transactions')
        console.log(res.data)
        setTransactionData(res.data.transactions)
        const label = res.data.transactions.slice(0, 5).map((transaction) => {
            return transaction.name;
        });
        setLabels(label)
        const value = res.data.transactions.slice(0, 5).map((transaction) => {
            return transaction.amount
        })
        setValues(value)
    }

    useEffect(() => {
        getChartData()
    }, [])

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Transactions',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,
        }]
    }

    const options = {
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        scales:{
            yAxes: [{
                display: false
            }],
            xAxes: [{
                ticks: {
                    callback: (value) => {
                        return value.substr(0, 10)
                    }
                }
            }]
        }
        
    }

    return (
        <div>
            <div className={styles.chartContainer}>
                <div className={styles.chartTitle}>
                    Recent Transactions
                </div>
                <Bar data={chartData} options={options}/>
            </div>
        </div>
    )
}
