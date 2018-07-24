import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from "lodash";

import { Icon } from 'semantic-ui-react'

import Item from './Item'

import './IconItem.css';

const IconItem = (props) => (
    <Item {...props}><Icon
        name={props.icon}
        className={classNames('topo-item', 'topo-item-icon', 'selectable', {'selected': props.selected})}
        bordered={props.selected}
        size="huge"
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
