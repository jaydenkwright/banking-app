import React from 'react'
import { Link } from "react-router-dom";
import styles from './styles/Welcome.module.css'

export default function Welcome() {
    return (
        <div>
            <div className={styles.welcome}>
                <Link className={styles.link} to="/">
                    Welcome,
                    <div>Andy</div>
                </Link>
            </div>
        </div>
    )
}
