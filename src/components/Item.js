import React, { useState, useEffect } from 'react'
import styles from './styles/Item.module.css'
import axios from 'axios'

export default function Item() {
    const [item, setItem] = useState([])
    const [loaded, setLoaded] = useState(false)

    const getItem = async () => {
        const res = await axios.get('/plaid/item/epnnZE9xbKcXZVkLALLvU4vdpPEQp3tLNnn4z')
        setItem(res.data.item)
        setLoaded(true)
    }
    useEffect(() => {
        getItem()
    }, [])
    const { institutionName } = item
    return (
        <div>
            {loaded ? 
                <div className={styles.item}>
                    <div className={styles.itemTitle}>
                        {institutionName}
                    </div>
                    <div className={styles.itemSubtitle}>
                        Primary Account
                    </div>
                </div>
            : null}   
        </div>
    )
}
