import React, { useState, useEffect } from 'react'
import styles from './Item.module.css'
import axios from 'axios'

export default function Item() {
    const [item, setItem] = useState([])

    const getItem = async () => {
        const res = await axios.get('/plaid/item/epnnZE9xbKcXZVkLALLvU4vdpPEQp3tLNnn4z')
        setItem(res.data.item)
        console.log(res.data.item.name)
    }
    useEffect(() => {
        getItem()
    }, [])
    const { institutionName } = item
    return (
        <div>
            <div className={styles.item}>
                <div className={styles.itemTitle}>
                    {institutionName}
                </div>
                <div className={styles.itemSubtitle}>
                    Your Primary Account
                </div>
            </div>
        </div>
    )
}
