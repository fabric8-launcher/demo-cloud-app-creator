import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import logo from './assets/img/pizza.svg';
import './App.css';
import TemplateItem from './components/TemplateItem';
import { Button, Container, Header, Icon } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo"/>
          <h1 className="app-title">Welcome to the Cloud App Creator</h1>
        </header>
        <Container text>
          <Header
            as='h1'
            content='Think your application. Imagine WE can create it!'
          />
          <Header
            as='h2'
            content='This is a reality...'
          />
          <Button primary size='huge'>
            Get Started Now
            <Icon name='right arrow' />
          </Button>

          <TemplateItem title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']}/>
          <TemplateItem title="CRUD" description="A simple CRUD App" tags={['backend', 'frontend']}/>
        </Container>
      </div>
    );
  }
}

export default App;
