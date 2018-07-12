import React from 'react';
import { Container } from 'semantic-ui-react';
import SelectBox from '../components/SelectBox';
import Step from '../components/Step';

const TemplateStep = {
  key: 'select-template',
  title: 'Select a template',
  description: 'You can choose one of those predefined templates to create you app, you will still be able to customize it once selected.',
  picture: 'wpforms',
  children: (
    <SelectBox.List>
      <SelectBox.Item title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']} picture="/images/microservices.png"/>
      <SelectBox.Item title="CRUD" description="A simple CRUD App" tags={['backend', 'frontend']} picture="database"/>
      <SelectBox.Item title="Vert.x stack" description="Full stack from UI to REST to DB" tags={['backend', 'frontend']}/>
      <SelectBox.Item title="Messaging" description="AMQ Queue" tags={['messaging', 'amq', 'backend']}/>
      <SelectBox.Item title="Messaging" description="AMQ Topic" tags={['messaging', 'amq', 'backend']}/>
      <SelectBox.Item dummy/>
      <SelectBox.Item dummy/>
      <SelectBox.Item dummy/>
      <SelectBox.Item dummy/>
      <SelectBox.Item title="Custom" description="Fully custom design" />
    </SelectBox.List>
  )
}

class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      steps: [
        TemplateStep
      ]
    };

  }

  render() {
    return (
      <div className="create-page">
        <Container text>
          <Step.List>
            {this.state.steps.map(step => (<Step.Item {...step} />))}
          </Step.List>
        </Container>
      </div>
    );
  }
}


export default Create;
