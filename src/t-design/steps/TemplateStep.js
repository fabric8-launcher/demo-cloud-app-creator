import React from 'react';
import SelectBox from '../../components/SelectBox';
import Step from '../components/Step';

const TemplateStep = ({ action, id, title, icon }) => (
  <Step.Item
    title={title}
    description="You can choose one of those predefined templates to create you app, you will still be able to customize it once selected."
    icon={icon}
  >
    <SelectBox.List>
      <SelectBox.Item title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']} picture="/images/microservices.png" onClick={action}/>
      <SelectBox.Item title="CRUD" description="A simple CRUD App" tags={['backend', 'frontend']} picture="database" onClick={action}/>
      <SelectBox.Item title="Vert.x stack" description="Full stack from UI to REST to DB" tags={['backend', 'frontend']} onClick={action}/>
      <SelectBox.Item title="Messaging" description="AMQ Queue" tags={['messaging', 'amq', 'backend']} onClick={action}/>
      <SelectBox.Item title="Messaging" description="AMQ Topic" tags={['messaging', 'amq', 'backend']} onClick={action}/>
      <SelectBox.Item dummy onClick={action}/>
      <SelectBox.Item dummy onClick={action}/>
      <SelectBox.Item dummy onClick={action}/>
      <SelectBox.Item dummy onClick={action}/>
      <SelectBox.Item title="Custom" description="Fully custom design" onClick={action} />
    </SelectBox.List>
  </Step.Item>
);


TemplateStep.defaultProps = {
  id: 'select-template',
  title: 'Select a template',
  icon: 'wpforms'
};

export default TemplateStep;