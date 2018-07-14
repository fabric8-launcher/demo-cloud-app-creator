import React from 'react';
import Step from '../components/Step';
import { Checkbox, Form } from 'semantic-ui-react';
import PropTypes from "prop-types";

const MessageBrokerStep = ({ action, id, title, icon }) => (
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

MessageBrokerStep.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

MessageBrokerStep.defaultProps = {
  title: 'Message Broker: AMQ',
  icon: 'bullhorn'
};

export default MessageBrokerStep;