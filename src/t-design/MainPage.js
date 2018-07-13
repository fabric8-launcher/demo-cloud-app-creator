import React from 'react';
import { Checkbox, Container, Form, Menu } from 'semantic-ui-react';
import SelectBox from '../components/SelectBox';
import Step from './components/Step';
import './MainPage.css';

import logo from '../assets/img/pizza.svg';

const templateStep = ({ action }) => (
  <Step.Item
      key="select-template"
      title="Select a template"
      description="You can choose one of those predefined templates to create you app, you will still be able to customize it once selected."
      picture="wpforms"
  >
    <SelectBox.List>
      <SelectBox.Item title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']} picture="/images/microservices.png" onClick={action}/>
      <SelectBox.Item title="CRUD" description="A simple CRUD App" tags={['backend', 'frontend']} picture="database" onClick={action}/>
      <SelectBox.Item title="Vert.x stack" description="Full stack from UI to REST to DB" tags={['backend', 'frontend']} onClick={action}/>
      <SelectBox.Item title="Messaging" description="AMQ Queue" tags={['messaging', 'amq', 'backend']} onClick={action}/>
      <SelectBox.Item title="Messaging" description="AMQ Topic" tags={['messaging', 'amq', 'backend']} onClick={action}/>
      <SelectBox.Item dummy onClick={action}/>
      <SelectBox.Item dummy onClick={action}/>
      <SelectBox.Item dummy onClick={action}/>
      <SelectBox.Item dummy onClick={action}/>
      <SelectBox.Item title="Custom" description="Fully custom design" onClick={action} />
    </SelectBox.List>
  </Step.Item>
);

const messageBrokerStep = ({ action }) => (
  <Step.Item
    key="message-broker"
    title="Message Broker: AMQ"
    description="A message broker based on Red Hat AMQ."
    picture="bullhorn"
  >
    <Form>
      <Form.Field>
        Type
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Queue (one listener)'
          name='queue'
          value='this'
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Topic (many listeners)'
          name='topic'
          value='this'
        />
      </Form.Field>
    </Form>
  </Step.Item>
);

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.addStep.bind(this);
    this.state = {
      steps: [
        templateStep({ action: () => this.addMessageBrokerStep() }),
      ]
    };

  }

  addStep(step) {
    this.setState({ steps: [...this.state.steps, step]});
  }

  addMessageBrokerStep() {
    this.addStep(messageBrokerStep({ action: () => {}}))
  }

  render() {
    return (
      <div className="t-design-mainpage">
        <Menu vertical inverted fixed="left">
          <Menu.Item className="logo">
            <a href="/"><img src={logo} className="app-logo" alt="logo"/></a>
          </Menu.Item>
          <Menu.Item>
            <Step.Index>
              {this.state.steps}
            </Step.Index>
          </Menu.Item>
        </Menu>
        <Container text>
          <Step.List>
            {this.state.steps}
          </Step.List>
        </Container>
      </div>
    );
  }
}


export default MainPage;
