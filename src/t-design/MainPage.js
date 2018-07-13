import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

import './MainPage.css';

import logo from '../assets/img/pizza.svg';
import Step from './components/Step';
import MessageBrokerStep from './steps/MessageBrokerStep';
import TemplateStep from './steps/TemplateStep';
import SelectComponentStep from "./steps/SelectComponentStep";
import GenerateStep from "./steps/GenerateStep";

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.addStep.bind(this);
    this.state = {
      steps: [
        (<TemplateStep key={0} action={() => this.addMessageBrokerStep()} />),
      ]
    };

  }

  addStep(step) {
    this.setState({ steps: [...this.state.steps, step]});
  }

  addMessageBrokerStep() {
    this.addStep((<MessageBrokerStep key={this.state.steps.length} action={() => {}}/>));
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
          <Step.List nonEmptyStep={<SelectComponentStep />} generateStep={<GenerateStep />}>
            {this.state.steps}
          </Step.List>
        </Container>
      </div>
    );
  }
}


export default MainPage;
