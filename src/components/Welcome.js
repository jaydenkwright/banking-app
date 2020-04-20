import React from 'react'
import styles from './Welcome.module.css'

export default function Welcome() {
    return (
        <div>
            <div className={styles.welcome}>
                Welcome,
                <div>Andy</div>
            </div>
        </div>
    )
}
