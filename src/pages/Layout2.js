import React, { Component } from 'react';
import { Container, Header, Form, FormInput } from 'semantic-ui-react';
import Lane from '../components/Lane';
import SelectBox from '../components/SelectBox';
import Part from '../components/Part';

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
          <Lane title="Applications"/>
        </Container>
        <Part/>
        <SelectBox.List itemsPerRow={5}>
                <SelectBox.Item title="Java" description="A Java application" tags={['backend', 'frontend']} picture="java" />
                <SelectBox.Item title="JavaScript (Node.js)" description="An application written in JavaScript" tags={['backend', 'frontend']} picture="node" />
                <SelectBox.Item title="Go" description="An application written in Go" tags={['messaging', 'amq', 'backend']} picture="go"/>
                <SelectBox.Item title="Ruby" description="Ruby" tags={['messaging', 'amq', 'backend']} picture="ruby"/>
              </SelectBox.List>
      </div>
    )
  }
}
