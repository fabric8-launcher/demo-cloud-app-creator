import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from 'semantic-ui-react'

import './IconItem.css';

const IconItem = (props) => (
    <Icon
        name={props.icon}
        className={classNames('topo-item', 'topo-item-icon', 'selectable', {'selected': props.selected})}
        bordered={props.selected}
        size="huge"
        onClick={() => props.onSelect(props)}
    />
);

IconItem.propTypes = {
    icon: PropTypes.string.isRequired,
    klass: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    belongsTo: PropTypes.string,
};

IconItem.defaultProps = {
    icon: 'question circle outline',
    selected: false,
    onSelect: ()=>{},
    belongsTo: null,
};

export default IconItem;
