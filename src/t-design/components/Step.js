import React from 'react';
import PropTypes from 'prop-types';
import './Step.css';

import { Icon, Item as BaseItem, Step as BaseStep } from 'semantic-ui-react'

const Item = (props) => (
    <BaseItem className={"step-item"}>
      <Icon name={props.icon} size="big"/>
      <BaseItem.Content>
        <BaseItem.Header>{props.title}</BaseItem.Header>
        <BaseItem.Meta>{props.description}</BaseItem.Meta>
        <BaseItem.Extra>
          {props.extra}
        </BaseItem.Extra>
      </BaseItem.Content>
      {props.children && (
        <BaseItem.Content className={'step-body'}>
          {props.children}
        </BaseItem.Content>
      )}
    </BaseItem>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  extra: PropTypes.node,
  children: PropTypes.node,
};

Item.defaultProps = {
  icon: null,
  extra: null,
  children: null,
};

const List = (props) => (
    <BaseItem.Group className={"step-list"}>
        {props.children}
        {React.Children.count(props.children) > 1 && props.nonEmptyStep != null && props.nonEmptyStep}
        {React.Children.count(props.children) > 1 && props.generateStep != null && props.generateStep}
    </BaseItem.Group>
);

List.propTypes = {
    nonEmptyStep: PropTypes.object,
    generateStep: PropTypes.object,
};

List.defaultProps = {
    nonEmptyStep: null,
    generateStep: null
};

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

