import React from 'react';
import Step from '../components/Step';

import { Button } from 'semantic-ui-react'

const GenerateStep = ({ action, id, title, icon }) => (
    <Step.Item
        title={title}
        description="Click the button on the right to generate your application"
        icon={icon}
        extra={(<Button primary floated='right' icon="right arrow" labelPosition="right" content="Generate" onClick={action}/>)}
    />
);

GenerateStep.defaultProps = {
  id: 'generate',
  title: 'Ready to generate your application?',
  icon: 'paper plane outline',
  action: ()=>{},
};

export default GenerateStep;
