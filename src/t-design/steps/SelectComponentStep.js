import React from 'react';
import SelectBox from '../../components/SelectBox';
import Step from '../components/Step';

const SelectComponentStep = ({ action, key, title, icon }) => (
    <Step.Item
        key={key}
        title={title}
        description="Add any other component from the full list of components available"
        icon={icon}
    >
    </Step.Item>
);

SelectComponentStep.defaultProps = {
  key: 'bottom-select-component',
  title: 'Do you want another component?',
  icon: 'plus square outline'
};

export default SelectComponentStep;