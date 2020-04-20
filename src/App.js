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

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Dashboard/>
        </Route>
        <Route path="/account" exact>
          <AccountDashboard/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
