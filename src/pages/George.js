import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';

export default class George extends Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <div className="create-page">
      <Container fluid text>
        <Header content="Let's put your components together"/>
      </Container>
    </div>
    )
  }
}
