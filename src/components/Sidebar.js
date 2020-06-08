import React from 'react'
import { Link, useLocation } from "react-router-dom";
import styles from './styles/Sidebar.module.css'

export default function Sidebar() {
    const { pathname } = useLocation()
    const scroll = (id) => {
        if(pathname === "/"){
            document.getElementById(id).scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    return (
        <div>
            <div className={styles.sidebar}>
                <div className={styles.links}>
                    <Link className={styles.link} to="/" onClick={() => scroll('App')} >Dashboard</Link>
                </div>
                <div className={styles.links}>
                    <Link className={styles.link} onClick={() => scroll('transactions')} to="/">Transactions</Link>
                </div>
                <div className={styles.links}>
                    <Link className={styles.link} onClick={() => scroll('accounts')}>Accounts</Link>
                </div>
            </div>
        </div>
    )
}
