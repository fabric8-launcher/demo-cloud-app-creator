import React, { Component } from 'react';
import { Container, Divider, Form, FormInput, Header } from 'semantic-ui-react';
import Step from '../t-design/components/Step';
import GenerateStep from '../t-design/steps/GenerateStep';
import Lane from './components/Lane';

export default class MainPage extends Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <div className="create-page">
        <Container>
          <Form>
              <FormInput label="Application name"/>
          </Form>
          <Header content="Let's put your components together"/>
          <fieldset>
                    <legend>Routes</legend>
                    <Container/>
          </fieldset>
          <Lane title="Components" />
          <Lane title="Resources"/>
        </Container>
        <Divider/>
        <Container text>
          <Step.List>
            <GenerateStep/>
          </Step.List>
        </Container>
      </div>
    )
  }
}
