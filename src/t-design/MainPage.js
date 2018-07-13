import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

import './MainPage.css';

import logo from '../assets/img/pizza.svg';
import Step from './components/Step';
import MessageBrokerStep from './steps/MessageBrokerStep';
import TemplateStep from './steps/TemplateStep';
import SelectComponentStep from "./steps/SelectComponentStep";
import GenerateStep from "./steps/GenerateStep";

const templates = [
    { id:1, title:"MicroService", description:"A simple MicroService", tags:['backend', 'microservice'], picture:"/images/microservices.png", step: (key) => (
            <MessageBrokerStep key={key} />
        )},
    { id:2, title:"CRUD", description:"A simple CRUD App", tags:['backend', 'frontend'], picture:"database", step: (key) => (
            <MessageBrokerStep key={key} />
        )},
    { id:3, title:"Vert.x stack", description:"Full stack from UI to REST to DB", tags:['backend', 'frontend'], step: (key) => (
            <MessageBrokerStep key={key} />
        )},
    { id:4, dummy: true },
    { id:5, dummy: true },
    { id:6, dummy: true },
    { id:7, title:"Messaging", description:"Messaging app using RedHat AMQ", tags:['messaging', 'amq', 'backend'], step: (key) => (
            <MessageBrokerStep key={key} />
        )},
    { id:8, dummy: true },
    { id:9, dummy: true },
    { id:10, title:"Custom", description:"Fully custom design", step: (key) => (
            <MessageBrokerStep key={key} />
        )},
];

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.clearAndAddFirstStep.bind(this);
    this.addStep.bind(this);
    this.firstStep = (<TemplateStep key={0} items={templates} action={(item) => !!item && !!item.step && this.clearAndAddFirstStep(item.step(this.state.steps.length))} />);
    this.state = {
      steps: [
        this.firstStep,
      ]
    };

  }

  clearAndAddFirstStep(step) {
    this.setState({ steps: [this.firstStep, step]});
  }

  addStep(step) {
    this.setState({ steps: [...this.state.steps, step]});
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
