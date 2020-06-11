import React from 'react'
import styles from './styles/Home.module.css'
import Svg from './Svg'

export default function Home() {
    return (
        <div>
            <div className={styles.image}>
                <Svg />
            </div>
            <div className={styles.title}>
                Simple Banking Dashboard
            </div>
        </div>
    )
}
