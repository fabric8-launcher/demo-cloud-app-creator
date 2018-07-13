import React from 'react';
import Step from '../components/Step';

const GenerateStep = ({ action, id, title, icon }) => (
    <Step.Item
        title={title}
        description="Click the button on the right to generate your application"
        icon={icon}
    >
    </Step.Item>
);

GenerateStep.defaultProps = {
  id: 'generate',
  title: 'Ready to generate your application?',
  icon: 'paper plane outline'
};

export default GenerateStep;