import React from 'react';
import PropTypes from 'prop-types';
import './Step.css';

import { Card } from 'semantic-ui-react'

const Item = (props) => (
    <Card className={"step-item"}>
      <Card.Content>
        <Card.Header textAlign="left">{props.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        {props.children}
      </Card.Content>
    </Card>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
};

const List = (props) => (
    <Card.Group itemsPerRow={1} className={"step-list"}>
        {props.children}
    </Card.Group>
);

const Step = { List, Item };

export default Step;

