import React from 'react';
import SelectBox from '../../components/SelectBox';
import Step from '../components/Step';

const TemplateStepItem = (props) => (
    <SelectBox.Item {...props} onClick={props.action}/>
);

export default TemplateStepItem;
