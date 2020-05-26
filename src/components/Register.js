import React, { useState } from 'react'
import styles from './styles/Register.module.css'
import axios from 'axios'

export default function Register() {
    const [firstName, setFirstName] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const register = async () => {
        const res = await axios.post('/auth/register', {
            firstName,
            lastName,
            email,
            password
        }, {
            'withCredentials': true
        })
    }
    const submit = async (e) => {
        e.preventDefault()
        register()
    }
    return (
        <div>
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.textField}>
                    <input className={styles.textbox} type='text' placeholder='Firstname...' onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className={styles.textField}>
                    <input className={styles.textbox} type='text' placeholder='Lastname...' onChange={(e) => setLastName(e.target.value)}/>
                </div>
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
