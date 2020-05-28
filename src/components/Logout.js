import React from 'react'
import styles from './styles/Logout.module.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

export default function Logout({ setIsLoggedIn }) {
    const history = useHistory()
    const logout = async () => {
        const res = await axios.post('/auth/logout',  {
            'withCredentials': true
        })
        setIsLoggedIn(false)
        history.push(`/`)
    }
    return (
        <div>
            <button className={styles.LogoutBtn} onClick={logout}>
                Logout
            </button>
        </div>
    )
}
