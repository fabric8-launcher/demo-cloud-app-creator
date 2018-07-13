import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import './App.css';
import TMainPage from './t-design/MainPage';
import GMainPage from './g-design/MainPage';
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

        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/t-design' component={TMainPage}/>
            <Route path='/g-design' component={GMainPage}/>
            <Route path='/matrix' component={BoosterMatrix}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
