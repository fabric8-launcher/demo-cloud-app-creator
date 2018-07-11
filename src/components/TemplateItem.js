import React from 'react';
import PropTypes from 'prop-types';

import { Card, Image, Label, Icon } from 'semantic-ui-react'

const TemplateItem = ({ title, icon, iconImage, tags, description }) => (
  <Card as="a">
    {icon && (<Icon name={icon} size="huge" />)}
    {iconImage && (<Image src={iconImage} />)}
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
    {tags.length > 0 && (
      <Card.Content extra>
        <span className='tags'>{tags.map(t => (<Label>{t}</Label>))}</span>
      </Card.Content>
    )}
  </Card>
);

TemplateItem.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.node,
  iconImage: PropTypes.node,
  description: PropTypes.string.isRequired,
};

TemplateItem.defaultProps = {
  tags: [],
  icon: null,
  iconImage: null
};

export default TemplateItem;
