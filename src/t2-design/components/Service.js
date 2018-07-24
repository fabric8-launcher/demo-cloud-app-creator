import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import { Card, Icon } from 'semantic-ui-react'

import Item from './Item'

import './Service.css';

const Service = (props) => (
    <Item {...props}><Card
        className={classNames('topo-item', 'topo-service', 'selectable', {'selected': props.selected})}
        color={props.selected ? 'red' : 'grey'}
        onClick={() => props.onSelect(props)}
    >
        <Card.Content textAlign="left">
            <Icon name={props.icon} className="floatleft" size="big"/>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>Service / Deployment / Build</Card.Meta>
        </Card.Content>
    </Card></Item>
);

Service.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

Service.defaultProps = {
    icon: 'cogs',
    klass: 'service',
};

export default Service;
