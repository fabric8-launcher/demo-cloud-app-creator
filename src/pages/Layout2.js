import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

export default class Layout2 extends Component {
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
