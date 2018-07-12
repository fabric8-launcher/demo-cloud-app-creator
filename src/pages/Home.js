import React from 'react';
import { Button, Container, Header, Icon } from 'semantic-ui-react';

const Home = () => (
  <div className="home-page">
    <Container text>
      <Header as='h1' content='Think your application. Imagine WE can create it!' />
      <Header as='h2' content='This is a reality...' />
      <Button primary size='huge' as="a" href="/create">Get Started Now<Icon name='right arrow' /></Button>
    </Container>
  </div>
);


export default Home;
