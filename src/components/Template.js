import React from 'react';
import PropTypes from 'prop-types';
import './Template.css';

import { Card, Image, Label, Icon } from 'semantic-ui-react'

const Item = (props) => (
  <Card as="a" className={`template-item ${props.dummy && 'dummy'}`}>
    {props.icon && (<Icon name={props.icon} size="huge" />)}
    {props.iconImage && (<Image src={props.iconImage} />)}
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
  icon: PropTypes.string,
  iconImage: PropTypes.string,
  dummy: PropTypes.bool,
};

Item.defaultProps = {
  title: 'A dummy title',
  description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  tags: [],
  icon: null,
  iconImage: null,
  dummy: false
};

const List = (props) => (
  <Card.Group {...props} />
);

const Template = { Item, List };

export default Template;
