import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import logo from './assets/img/pizza.svg';
import Create from './pages/Create';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <a href="/"><img src={logo} className="app-logo" alt="logo"/></a>
          <h1 className="app-title">Welcome to the Cloud App Creator</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/create' component={Create}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
