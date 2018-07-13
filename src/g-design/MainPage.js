import React, { Component } from 'react';
import { Container, Form, FormInput, Header, Divider} from 'semantic-ui-react';
import GenerateStep from '../t-design/steps/GenerateStep';
import Lane from './components/Lane';
import Step from '../t-design/components/Step';

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
