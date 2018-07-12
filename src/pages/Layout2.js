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
          <Lane title="Integrate with these services"/>
          <Lane title="Resources"/>
        </Container>
        <Part/>
        <SelectBox.List itemsPerRow={5} title="foo">
                <SelectBox.Item title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']} picture="/images/microservices.png"/>
                <SelectBox.Item title="Config Map" description="A simple CRUD App" tags={['backend', 'frontend']} picture="database" />
                <SelectBox.Item title="Secret" description="Full stack from UI to REST to DB" tags={['backend', 'frontend']} />
                <SelectBox.Item title="Messaging" description="AMQ" tags={['messaging', 'amq', 'backend']}/>
                <SelectBox.Item title="Cache" description="Infinispan" tags={['messaging', 'amq', 'backend']}/>
              </SelectBox.List>
      </div>
    )
  }
}
