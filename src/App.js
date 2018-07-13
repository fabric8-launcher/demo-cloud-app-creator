import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import './App.css';
import Create from './pages/Create';
import Layout2 from './pages/Layout2';
import Home from './pages/Home';
import BoosterMatrix from './pages/BoosterMatrix';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { mounting: true };
  }
  componentDidMount() {
    this.setState(prevState => ({
      mounting: false
    }));
  }

  render() {
    return (
      <div className="app">
        <Dimmer active={this.state.mounting}>
          <Loader />
        </Dimmer>
        <header className="app-header">
          <h1 className="app-title">Welcome to the Cloud App Creator</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/create' component={Create}/>
            <Route path='/layout2' component={Layout2}/>
            <Route path='/matrix' component={BoosterMatrix}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
