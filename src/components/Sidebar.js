import React from 'react'
import { Link, useLocation } from "react-router-dom";
import styles from './styles/Sidebar.module.css'

export default function Sidebar() {
    const { pathname } = useLocation()
    const scroll = () => {
        if(pathname === "/"){
            document.getElementById('transactions').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    return (
        <div>
            <div className={styles.sidebar}>
                <div className={styles.links}>
                    <Link className={styles.link} to="/" onClick={scroll}>Dashboard</Link>
                </div>
                <div className={styles.links}>Transactions</div>
                <div className={styles.links}>Expenses</div>
            </div>
        </div>
    )
}
