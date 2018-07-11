import React from 'react';
import PropTypes from 'prop-types';

import { Card, Image, Label, Icon } from 'semantic-ui-react'

const TemplateItem = (props) => (
  <Card as="a">
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

TemplateItem.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.string,
  iconImage: PropTypes.string,
  description: PropTypes.string.isRequired,
};

TemplateItem.defaultProps = {
  tags: [],
  icon: null,
  iconImage: null
};

export default TemplateItem;
