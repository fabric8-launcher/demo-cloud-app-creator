import React from 'react';
import PropTypes from 'prop-types';

import { Card, Label } from 'semantic-ui-react'

const TemplateItem = ({ title, tags, description }) => (
  <Card as="a">
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
  description: PropTypes.string.isRequired,
};

TemplateItem.defaultProps = {
  tags: [],
};

export default TemplateItem;
