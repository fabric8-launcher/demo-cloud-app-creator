import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Card, Icon } from 'semantic-ui-react'

import './Service.css';

const Service = (props) => (
    <Card
        className={classNames('topo-item', 'topo-service', 'selectable', {'selected': props.selected})}
        color={props.selected?'red':'grey'}
        onClick={() => props.onSelect(props)}
    >
        <Card.Content textAlign="left">
            <Icon name={props.icon} className="floatleft" size="big" />
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>Service / Deployment / Build</Card.Meta>
        </Card.Content>
    </Card>
);

Service.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    belongsTo: PropTypes.string,
};

Service.defaultProps = {
    icon: 'cogs',
    klass: 'service',
    selected: false,
    onSelect: ()=>{},
    belongsTo: null,
};

export default Service;
