import React from 'react';
import PropTypes from 'prop-types';
import './Step.css';

import { Item as BaseItem } from 'semantic-ui-react'
import Picture from './Picture';

const Item = (props) => (
    <BaseItem className={"step-item"} inverted>
      <Picture value={props.picture} />
      <BaseItem.Content>
        <BaseItem.Header>{props.title}</BaseItem.Header>
        <BaseItem.Meta>{props.description}</BaseItem.Meta>
      </BaseItem.Content>
      <BaseItem.Content className={'step-body'}>
        {props.children}
    </BaseItem.Content>

    </BaseItem>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string,
};

Item.defaultProps = {
  picture: null,
};


const List = (props) => (
    <BaseItem.Group className={"step-list"}>
        {props.children}
    </BaseItem.Group>
);

const Step = { List, Item };

export default Step;

