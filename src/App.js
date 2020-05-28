import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AccountLink from './components/AccountLink'
import Sidebar from './components/Sidebar'
import AccountDashboard from './components/AccountDashboard'
import Dashboard from './components/Dashboard'
import TransactionDashboard from './components/TransactionDashboard'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'

function App() {
  return (
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
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
