import React from 'react';
import SelectBox from '../../components/SelectBox';
import Step from '../components/Step';

const GenerateStep = ({ action, key, title, icon }) => (
    <Step.Item
        key={key}
        title={title}
        description="Click the button on the right to generate your application"
        icon={icon}
    >
    </Step.Item>
);

GenerateStep.defaultProps = {
  key: 'generate',
  title: 'Ready to generate your application?',
  icon: 'paper plane outline'
};

export default GenerateStep;