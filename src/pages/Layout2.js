import React, { Component } from 'react';
import { Container, Form, FormInput, Header } from 'semantic-ui-react';
import Lane from '../components/Lane';

export default class Layout2 extends Component {
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
          <Lane title="Application"/>
        </Container>
      </div>
    )
  }
}
