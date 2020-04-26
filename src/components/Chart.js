import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles/Chart.module.css'
import { Bar } from 'react-chartjs-2'

export default function Chart() {
    const [transactionData, setTransactionData] = useState([])
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])
    const [loaded, setLoaded] = useState(false)
    const getChartData = async () => {
        const res = await axios('/plaid/transactions')
        const  { transactions } = res.data
        setTransactionData(transactions)
        setLoaded(true)
        const label = transactions.slice(0, 5).map((transaction) => {
            return transaction.name;
        });
        setLabels(label)
        const value = transactions.slice(0, 5).map((transaction) => {
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
            backgroundColor: '#ef5350',
            hoverBackgkroundColor: '#ef5350',
            borderColor: '#a1b0c5',
            data: values,
            barPercentage: .7,
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
                display: true,
                ticks: {
                    max: 1000,
                    fontColor: '#192443'
                }
            }],
            xAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    callback: (value) => {
                        return `${value.substr(0, 7)}...`
                    },
                    fontColor: '#192443'
                }
            }],
            layout: {
                padding: {
                    top: 5,
                    left: 15,
                    right: 15,
                    bottom: 15
                }
            }
        }
        
    }

    return (
        <div>
            {loaded ? 
                <div className={styles.chartContainer}>
                    <div className={styles.chartTitle}>
                        Recent Transactions
                    </div>
                    <Bar 
                        data={chartData} 
                        options={options}
                    />
                </div>
            : null}       
        </div>
    )
}
