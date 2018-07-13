import React from 'react';
import PropTypes from 'prop-types';
import './SelectBox.css';
import classNames from 'classnames';

import { Card, Label } from 'semantic-ui-react'
import Picture from './Picture';

const Item = (props) => (
  <Card as="a" className={classNames('template-item', {'dummy': props.dummy, 'selected': props.selected})} onClick={props.onClick} raised>
    <div className="main-content">
      <Picture value={props.picture} />
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
    </div>
    {props.tags.length > 0 && (
      <Card.Content extra className='tags'>
        <span>{props.tags.map((t, index) => (<Label key={index}>{t}</Label>))}</span>
      </Card.Content>
    )}
  </Card>
);

Item.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  picture: PropTypes.string,
  dummy: PropTypes.bool,
};

Item.defaultProps = {
  title: 'A dummy title',
  description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
  tags: [],
  picture: null,
  dummy: false,
  onClick: null,
};

const List = (props) => (
  <Card.Group {...props} centered />
);

const SelectBox = { Item, List };

export default SelectBox;
