import React from 'react'
import styles from './styles/Logout.module.css'
import axios from 'axios'

export default function Logout() {

    const logout = async () => {
        const res = await axios.post('/auth/logout',  {
            'withCredentials': true
        })
    }
    return (
        <div>
            <button className={styles.LogoutBtn} onClick={logout}>
                Logout
            </button>
        </div>
    )
}
