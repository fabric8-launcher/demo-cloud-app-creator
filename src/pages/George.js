import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import TemplateItem from '../components/TemplateItem';

const George = () => (
  <div className="create-page">
    <Container fluid text>
      <Card.Group itemsPerRow={3}>
        <TemplateItem title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']} iconImage="/images/microservices.png"/>
      </Card.Group>
    </Container>
  </div>
);


export default George;
