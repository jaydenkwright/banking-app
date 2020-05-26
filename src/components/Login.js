import React, { useState } from 'react'
import styles from './styles/Login.module.css'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const submit = (e) => {
        
    }

    return (
        <div>
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.textField}>
                    <input className={styles.textbox} type='email' placeholder='Email...' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.textField}>
                    <input className={styles.textbox} type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                    <input className={styles.submitBtn} type='submit' />
            </form>
        </div>
    )
}
