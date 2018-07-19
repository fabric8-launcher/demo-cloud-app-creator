import React, { Component } from 'react';
import { Container, Divider, Form, FormInput, Header } from 'semantic-ui-react';
import Lane from './components/Lane';

export default class MainPage extends Component {
  state = {
    propertyPanelVisible: false
  }

  handleStepSelected = (e, step) => {
    this.setState({
      title: step.props.title,
      description: step.props.description,
      propertyPanelVisible: true
    })
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
          <Lane title="Components" onComponentSelected={this.handleStepSelected} />
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
