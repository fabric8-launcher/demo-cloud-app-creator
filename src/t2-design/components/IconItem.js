import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from 'semantic-ui-react'

import Item from './Item'

import './IconItem.css';

const IconItem = (props) => (
    <Item {...props}><Icon
        name={props.icon}
        className={classNames('topo-item', 'topo-item-icon', 'selectable', {'selected': props.selected, 'suggested': props.suggested})}
        size="huge"
        bordered
        onClick={() => props.onSelect(props)}
    /></Item>
);

IconItem.propTypes = {
    icon: PropTypes.string.isRequired,
};

IconItem.defaultProps = {
    icon: 'question circle outline',
};

export default IconItem;
