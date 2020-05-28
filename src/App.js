import React, { useState, useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";
import AccountLink from './components/AccountLink'
import Sidebar from './components/Sidebar'
import AccountDashboard from './components/AccountDashboard'
import Dashboard from './components/Dashboard'
import TransactionDashboard from './components/TransactionDashboard'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import axios from 'axios'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)

  const getCurrentUser = async () => {
    try{
      const res = await axios.get('/auth/user', {
        'withCredentials': true
      })
      console.log(res.data)
      setIsLoggedIn(true)
    }catch(err){
      console.log(err.response.status)
      setIsLoggedIn(false)
    }
  }
  console.log(isLoggedIn)
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <div>
    {isLoggedIn === true ? 
    <Router>
      <Sidebar />
      <div className="main">
        <div className="dashboards">
          <Switch>
            <Route path="/" exact>
              <Dashboard/>
            </Route>
            <Route path="/account/:id">
              <AccountDashboard/>
            </Route>
            <Route path="/transaction/:id">
              <TransactionDashboard/>
            </Route>
            <Route path="/link">
              <AccountLink />
            </Route>
            <Route path="/logout">
              <Logout setIsLoggedIn={setIsLoggedIn}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    : isLoggedIn === false ?
    <Router>
      <Switch>
      <Route path="/">
          <Login setIsLoggedIn={setIsLoggedIn}/>
        </Route> 
      <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login setIsLoggedIn={setIsLoggedIn}/>
        </Route>
      </Switch>
    </Router>
    : 'loading'}
    </div>
  );
}

export default App;
