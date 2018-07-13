import React from 'react';
import Step from '../components/Step';

const SelectComponentStep = ({ action, id, title, icon }) => (
    <Step.Item
        title={title}
        description="Add any other component from the full list of components available"
        icon={icon}
    >
    </Step.Item>
);

SelectComponentStep.defaultProps = {
  id: 'bottom-select-component',
  title: 'Do you want another component?',
  icon: 'plus square outline'
};

export default SelectComponentStep;