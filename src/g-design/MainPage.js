import React, { Component } from 'react';
import { Container, Divider, Form, FormInput, Header } from 'semantic-ui-react';
import Lane from './components/Lane';

export default class MainPage extends Component {
  state = {
    propertyPanelVisible: false
  }

  handleStepSelected = (e, step) => {
    console.log(step);
    this.setState({
      title: step.title,
      description: step.description,
      propertyPanelVisible: step !== null
    })
  }

  handleRouteCreate = (e, step) => {
    console.log(step);
  }

  render() {
    return (
      <div className="create-page">
        <Container>
          <Form>
            <FormInput label="Application name" />
          </Form>
          <Header content="Let's put your components together" />
          <fieldset>
            <legend>Routes</legend>
            <Container />
          </fieldset>
          <Lane title="Components" onComponentSelected={this.handleStepSelected} onRouteCreate={this.handleRouteCreate} />
        </Container>
        <Divider />
        {this.state.propertyPanelVisible && (
          <Container>
            <h1>{this.state.title}</h1>
            <h2>{this.state.description}</h2>
            <Form>
              <FormInput label="Github repository URL" />
            </Form>
          </Container>
        )}
      </div>
    )
  }
}
