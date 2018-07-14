import React from 'react';
import Step from '../components/Step';

import { Form } from 'semantic-ui-react'

const runtimes = [
    { key: 'vertx', text: 'Vert.x', value: 'vertx' },
    { key: 'sb', text: 'Spring Boot', value: 'springb' },
    { key: 'nodejs', text: 'NodeJs', value: 'nodejs' },
    { key: 'wf', text: 'Wildfly', value: 'wildfly' },
];

const versions = [
    { key: 'com', text: 'Community', value: 'community' },
    { key: 'rh', text: 'Red Hat', value: 'redhat' },
];

const PlainListenerStep = ({ action, id, title, icon }) => (
    <Step.Item
        title={title}
        description="A simple message listener that logs incoming messages"
        icon={icon}
    >
        <Form>
            <Form.Group>
                <Form.Select label="Runtime" options={runtimes} placeholder="Runtime" required />
                <Form.Select label="Version" options={versions} placeholder="Version" required />
            </Form.Group>
        </Form>
    </Step.Item>
);

PlainListenerStep.defaultProps = {
  title: 'Plain Listener',
  icon: 'paper plane outline'
};

export default PlainListenerStep;
