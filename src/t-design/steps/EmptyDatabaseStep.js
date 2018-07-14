import React from 'react';
import Step from '../components/Step';

import { Form } from 'semantic-ui-react'

const types = [
    { key: 'psql', text: 'PostgresQL', value: 'postgresql' },
    { key: 'mysql', text: 'mySQL', value: 'mysql' },
];

const EmptyDatabaseStep = ({ action, id, title, icon }) => (
    <Step.Item
        title={title}
        description="Create a new empty database"
        icon={icon}
    >
        <Form>
            <Form.Select label="Type" options={types} placeholder="Database" required />
            <Form.Input label="Name" placeholder="Name" required />
            <Form.Button label="Schema">Import...</Form.Button>
            <Form.Input label="User" placeholder="User" required />
            <Form.Input label="Password" type="password" required />
        </Form>
    </Step.Item>
);

EmptyDatabaseStep.defaultProps = {
  title: 'Empty database',
  icon: 'database'
};

export default EmptyDatabaseStep;
