import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Card, Icon } from 'semantic-ui-react'

import Item from './Item'

import './Service.css';

const Service = (props) => (
    <Item {...props}><Card
        className={classNames('topo-item', 'topo-service', 'selectable', {'selected': props.selected, 'suggested': props.suggested})}
        color={props.selected ? 'red' : 'grey'}
        onClick={() => props.onSelect(props)}
    >
        <Card.Content textAlign="left">
            <Icon name={props.icon} className="floatleft" size="big"/>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>{serviceType(props)}</Card.Meta>
        </Card.Content>
    </Card></Item>
);

const serviceType = (props) => {
    let type;
    if (props.hasBuildConfig || (props.services && props.services.length > 0)) {
        type = [<span key="dc" title="DeploymentConfig">DC</span>];
        if (props.hasBuildConfig) {
            type = [...type, " / ", <span key="bc" title="BuildConfig">BC</span>];
        }
        if (props.services && props.services.length > 0) {
            type = ["Services / ", type];
        }
    } else {
        type = "DeploymentConfig"
    }
    return type;
};

Service.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

Service.defaultProps = {
    icon: 'cogs',
    klass: 'service',
};

export default Service;
