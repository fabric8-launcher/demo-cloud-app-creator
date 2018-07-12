import React, { Component } from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';
import Lane from '../components/Lane';

export default class Layout2 extends Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <div className="create-page">
        <Container fluid text>
          <Header content="Let's put your components together"/>
          <Lane title="Internal"/>
          <Divider/>
          <Lane title="Your App"/>
          <Divider/>
          <Lane title="External"/>
        </Container>
      </div>
    )
  }
}
