import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styles from './styles/Accounts.module.css'
import axios from 'axios'
import { capitalizeFirstLetter } from './functions'

export default function Accounts() {
    const [accounts, setAccounts] = useState([])
    const [loaded, setLoaded] = useState(false)

    const getAccounts = async () => {
        try{
            const res = await axios.get('/plaid/accounts', {
                'withCredentials': true
            })
            setAccounts(res.data.accounts)
            setLoaded(true)
        }catch(err){
            
        }
    }

    useEffect(() => {
        getAccounts()
    }, [])

    return (
        <div>
            {loaded ? 
                <div>
                    {
                        accounts.map(({name, officialName, accountId, type}, i) => 
                            <div key={i} className={styles.account} id='accounts'>
                                <div className={styles.accountTitle}>
                                    <Link className={styles.link} to={`/account/${accountId}`}>{name}</Link>
                                </div>
                                <div className={styles.accountSubtitle}>
                                    {officialName ? officialName : capitalizeFirstLetter(type)}
                                </div>
                            </div>
                        )
                    }
                </div>
            : null}
        </div>
    )
}
