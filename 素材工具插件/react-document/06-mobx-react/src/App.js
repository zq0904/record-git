import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Base from './components/Base'
import Api from './components/Api'
import './App.css';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/" component={Base} />
        <Route path="/Api" component={Api} />
      </Switch>
    </Router>
  );
}

export default App;
