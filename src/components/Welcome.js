import React, { useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import styles from './styles/Welcome.module.css'
import axios from 'axios'

export default function Welcome() {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(undefined)
    const getCurrentUser = async () => {
        try{
          const res = await axios.get('/auth/user', {
            'withCredentials': true
        })
          setCurrentUser(res.data.user)
          setLoaded(true)
        }catch(err){
            setError('Something went wrong')
        }
      }
      useEffect(() => {
        getCurrentUser()
      }, [])
    return (
        <div>
            {loaded ?
                !error ?
                <div className={styles.welcome}>
                    <Link className={styles.link} to="/">
                        Welcome,
                        <div>{currentUser.firstName}</div>
                    </Link>
                </div>
                : error
            : null }
        </div>
    )
}
