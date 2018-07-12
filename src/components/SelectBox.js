import React from 'react';
import PropTypes from 'prop-types';
import './SelectBox.css';

import { Card, Label } from 'semantic-ui-react'
import Picture from './Picture';

const Item = (props) => (
  <Card as="a" className={`template-item ${props.dummy && 'dummy'}`}>
    <Picture value={props.picture} />
    <Card.Content>
      <Card.Header>{props.title}</Card.Header>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    {props.tags.length > 0 && (
      <Card.Content extra>
        <span className='tags'>{props.tags.map((t, index) => (<Label key={index}>{t}</Label>))}</span>
      </Card.Content>
    )}
  </Card>
);

Item.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  picture: PropTypes.string,
  dummy: PropTypes.bool,
};

Item.defaultProps = {
  title: 'A dummy title',
  description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  tags: [],
  picture: null,
  dummy: false
};

const List = (props) => (
  <Card.Group {...props} centered />
);

const SelectBox = { Item, List };

export default SelectBox;
