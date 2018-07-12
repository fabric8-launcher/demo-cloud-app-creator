import React from 'react';
import { Container } from 'semantic-ui-react';
import Template from '../components/Template';

const Create = () => (
  <div className="create-page">
    <Container text>
      <Template.List itemsPerRow={3}>
        <Template.Item title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']} iconImage="/images/microservices.png"/>
        <Template.Item title="CRUD" description="A simple CRUD App" tags={['backend', 'frontend']} icon="database"/>
        <Template.Item title="Vert.x stack" description="Full stack from UI to REST to DB" tags={['backend', 'frontend']}/>
        <Template.Item title="Messaging" description="AMQ Queue" tags={['messaging', 'amq', 'backend']}/>
        <Template.Item title="Messaging" description="AMQ Topic" tags={['messaging', 'amq', 'backend']}/>
        <Template.Item dummy/>
        <Template.Item dummy/>
        <Template.Item dummy/>
        <Template.Item dummy/>
        <Template.Item dummy/>
        <Template.Item dummy/>
        <Template.Item dummy/>
        <Template.Item title="Custom" description="Fully custom design" />
      </Template.List>
    </Container>
  </div>
);


export default Create;
