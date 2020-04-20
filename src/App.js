import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AccountDashboard from './components/AccountDashboard'
import Dashboard from './components/Dashboard'
import TransactionDashboard from './components/TransactionDashboard'

function App() {
  return (
    <Router>
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
      </Switch>
    </Router>
  );
}

export default App;
