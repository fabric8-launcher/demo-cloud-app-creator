import React from 'react';
import PropTypes from 'prop-types';

import { Card, Image, Label, Icon } from 'semantic-ui-react'

const TemplateItem = (props) => (
  <Card as="a" className={(props.dummy ? "dummy" : "")}>
    {props.icon && (<Icon name={props.icon} size="huge" />)}
    {props.iconImage && (<Image src={props.iconImage} />)}
    <Card.Content>
      <Card.Header className={(props.dummy ? "dummybold" : "")}>{props.title}</Card.Header>
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
  dummy: PropTypes.bool,
};

TemplateItem.defaultProps = {
  tags: [],
  icon: null,
  iconImage: null,
  dummy: false
};

export default TemplateItem;
