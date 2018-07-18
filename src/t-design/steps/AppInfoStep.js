import React from 'react';
import Step from '../components/Step';

import { Form } from 'semantic-ui-react'

const AppInfoStep = ({ action, id, title, icon }) => (
    <Step.Item
        title={title}
        icon={icon}
    >
        <Form>
            <Form.Input label="Application Name" placeholder="Name" value="my-app" required />
            <Form.Input label="Maven Artifact" value="booster" required />
            <Form.Input label="Maven Version" value="1.0.0-SNAPSHOT" required />
            <Form.Input label="Maven Group ID" value="io.openshift" required />
            <Form.Button primary floated='right' icon="right arrow" labelPosition="right" content="Deploy" onClick={action} />
        </Form>
    </Step.Item>
);

AppInfoStep.defaultProps = {
  title: 'Application Information',
  icon: 'upload'
};

export default AppInfoStep;
