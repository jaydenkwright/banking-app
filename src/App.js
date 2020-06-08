import React, { useState, useEffect, lazy, Suspense } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Loading from './components/Loading'
import axios from 'axios'
import ErrorBoundary from './components/ErrorBoundary'
const Home = lazy(() => import('./components/Home'))
const Logout = lazy(() => import('./components/Logout'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const AccountLink = lazy(() => import('./components/AccountLink'))
const TransactionDashboard = lazy(() => import('./components/TransactionDashboard'))
const AccountDashboard = lazy(() => import('./components/AccountDashboard'))
const Sidebar = lazy(() => import('./components/Sidebar'))
const Dashboard = lazy(() => import('./components/Dashboard'))

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
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
