import React, { useState, useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AccountLink from './components/AccountLink'
import Sidebar from './components/Sidebar'
import AccountDashboard from './components/AccountDashboard'
import Dashboard from './components/Dashboard'
import TransactionDashboard from './components/TransactionDashboard'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import Loading from './components/Loading'
import axios from 'axios'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)

  const getCurrentUser = async () => {
    try{
      const res = await axios.get('/auth/user', {
        'withCredentials': true
      })
      setIsLoggedIn(true)
    }catch(err){
      setIsLoggedIn(false)
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <div id='App'>
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
      <Route exact path="/">
          <Home />
        </Route> 
      <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login setIsLoggedIn={setIsLoggedIn}/>
        </Route>
      </Switch>
    </Router>
    : <Loading />}
    </div>
  );
}

export default App;
