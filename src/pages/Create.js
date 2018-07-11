import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import TemplateItem from '../components/TemplateItem';

const Create = () => (
  <div className="create-page">
    <Container text>
      <Card.Group itemsPerRow={3}>
        <TemplateItem title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']} iconImage="/images/microservices.png"/>
        <TemplateItem title="CRUD" description="A simple CRUD App" tags={['backend', 'frontend']} icon="database"/>
        <TemplateItem title="Vert.x stack" description="Full stack from UI to REST to DB" tags={['backend', 'frontend']}/>
        <TemplateItem title="Messaging" description="AMQ Queue" tags={['messaging', 'amq', 'backend']}/>
        <TemplateItem title="Messaging" description="AMQ Topic" tags={['messaging', 'amq', 'backend']}/>
        <TemplateItem title="Some template" description="The template description" tags={['some', 'tag']} dummy/>
        <TemplateItem title="Some template" description="The template description" tags={['some', 'tag']} dummy/>
        <TemplateItem title="Some template" description="The template description" tags={['some', 'tag']} dummy/>
        <TemplateItem title="Some template" description="The template description" tags={['some', 'tag']} dummy/>
        <TemplateItem title="Some template" description="The template description" tags={['some', 'tag']} dummy/>
        <TemplateItem title="Some template" description="The template description" tags={['some', 'tag']} dummy/>
        <TemplateItem title="Some template" description="The template description" tags={['some', 'tag']} dummy/>
        <TemplateItem title="Custom" description="Fully custom design" />
      </Card.Group>
    </Container>
  </div>
);


export default Create;
