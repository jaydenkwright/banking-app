import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AccountDashboard from './components/AccountDashboard'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AccountDashboard/>
        </Route>
        <Route path="/account">
          <AccountDashboard/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
