import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

import './MainPage.css';

import logo from '../assets/img/pizza.svg';
import Step from './components/Step';
import TemplateStep from './steps/TemplateStep';
import MessageBrokerStep from './steps/MessageBrokerStep';
import SelectListenerStep from './steps/SelectListenerStep';
import SelectComponentStep from "./steps/SelectComponentStep";
import GenerateStep from "./steps/GenerateStep";
import AppInfoStep from "./steps/AppInfoStep";
import AppReadyStep from "./steps/AppReadyStep";

const flatMap = (f,xs) =>
    xs.reduce((acc, x) =>
        acc.concat(f(x)), []);

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.clearAndSetFirstSteps.bind(this);
    this.clearAndAddSteps.bind(this);
    this.replaceStepWithSteps.bind(this);
    this.addSteps.bind(this);

    this.templates = [
      { id:1, title:"MicroService", description:"A simple MicroService", tags:['backend', 'microservice'], picture:"/images/microservices.png", step: (key) => [
          <MessageBrokerStep key={key} id={key} />
      ]},
      { id:2, title:"CRUD", description:"A simple CRUD App", tags:['backend', 'frontend'], picture:"database", step: (key) => [
          <MessageBrokerStep key={key} id={key} />
      ]},
      { id:3, title:"Vert.x stack", description:"Full stack from UI to REST to DB", tags:['backend', 'frontend'], step: (key) => [
          <MessageBrokerStep key={key} id={key} />
      ]},
      { id:4, dummy: true },
      { id:5, dummy: true },
      { id:6, dummy: true },
      { id:7, title:"Messaging", description:"Messaging app using RedHat AMQ", tags:['messaging', 'amq', 'backend'], step: (key) => [
          <MessageBrokerStep key={key+"_1"} id={key+"_1"} />,
          <SelectListenerStep key={key+"_2"} id={key+"_2"} replaceStepWithSteps={(step, steps) => this.replaceStepWithSteps(step, steps)} />
      ]},
      { id:8, dummy: true },
      { id:9, dummy: true },
      { id:10, title:"Custom", description:"Fully custom design", step: (key) => [
          <MessageBrokerStep key={key} id={key} />
      ]},
    ];
    this.firstStep = (<TemplateStep key={"first"} id={"first"} items={this.templates} action={(item) => !!item && !!item.step && this.clearAndAddSteps(item.step("second"))} />);
    this.generateStep = (<GenerateStep action={() => this.clearAndSetFirstSteps([this.infoStep])} />);
    this.infoStep = (<AppInfoStep key={"info"} id={"info"} action={() => this.clearAndSetFirstSteps([this.readyStep])} />);
    this.readyStep = (<AppReadyStep key={"ready"} id={"ready"} />);
    this.state = {
      steps: [
        this.firstStep,
      ]
    };
  }

  clearAndSetFirstSteps(steps) {
    this.setState({ steps: [...steps]});
  }

  clearAndAddSteps(steps) {
    this.setState({ steps: [this.firstStep, ...steps]});
  }

  replaceStepWithSteps(step, steps) {
      this.setState({ steps: [...flatMap(x => x.props.id===step.props.id ? steps : x, this.state.steps)]});
  }

  addSteps(steps) {
    this.setState({ steps: [...this.state.steps, ...steps]});
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
          <Step.List nonEmptyStep={<SelectComponentStep key={"scs"} id={"scs"}/>} generateStep={this.generateStep}>
            {this.state.steps}
          </Step.List>
        </Container>
      </div>
    );
  }
}


export default MainPage;
