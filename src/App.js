import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import './App.css';
import Create from './pages/Create';
import George from './pages/George';
import Home from './pages/Home';

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
            <Route path='/george' component={George}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
