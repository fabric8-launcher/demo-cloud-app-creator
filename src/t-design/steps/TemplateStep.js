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
    {
        props.children.map(step => (
            <SelectBox.Item {...step.props} onClick={this.onSelect(step)}/>
        ))
    }
    </SelectBox.List>
  </Step.Item>
);

TemplateStep.defaultProps = {
  id: 'select-template',
  title: 'Select a template',
  icon: 'wpforms'
};

TemplateStep.onSelect = (item) => {
    props.action(item);
}

export default TemplateStep;