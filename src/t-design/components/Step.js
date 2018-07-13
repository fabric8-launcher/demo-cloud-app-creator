import React from 'react';
import PropTypes from 'prop-types';
import './Step.css';

import { Icon, Item as BaseItem, Step as BaseStep } from 'semantic-ui-react'

const Item = (props) => (
    <BaseItem className={"step-item"}>
      <Icon name={props.icon} />
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
  icon: PropTypes.string,
};

Item.defaultProps = {
  icon: null,
};

const List = (props) => (
    <BaseItem.Group className={"step-list"}>
        {props.children}
    </BaseItem.Group>
);

const Index = (props) => (
  <BaseStep.Group vertical>
  {
    props.children.map(step => (
      <BaseStep key={step.key}>
        <Icon name={step.props.icon} />
        <BaseStep.Content>
          <BaseStep.Title>{step.props.title}</BaseStep.Title>
        </BaseStep.Content>
      </BaseStep>
    ))
  }
  </BaseStep.Group>
);

const Step = { Item, List, Index };

export default Step;

