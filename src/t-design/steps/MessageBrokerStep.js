import React from 'react';
import Step from '../components/Step';
import { Checkbox, Form } from 'semantic-ui-react';

const MessageBrokerStep = ({ action, key, title, icon }) => (
  <Step.Item
    title={title}
    description="A message broker based on Red Hat AMQ."
    icon={icon}
  >
    <Form>
      <Form.Field>
        Type
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Queue (one listener)'
          name='queue'
          value='this'
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Topic (many listeners)'
          name='topic'
          value='this'
        />
      </Form.Field>
    </Form>
  </Step.Item>
);


MessageBrokerStep.defaultProps = {
  key: 'message-broker',
  title: 'Message Broker: AMQ',
  icon: 'bullhorn'
};

export default MessageBrokerStep;