import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import DOMRef from './DOMRef'

const Item = (props) => (
    <DOMRef domRef={(bp, node) => props.domRef(props, node)}>{props.children}</DOMRef>
);

Item.propTypes = {
    type: PropTypes.string.isRequired,
    klass: PropTypes.string.isRequired,
    domRef: PropTypes.func,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    belongsTo: PropTypes.string,
};

Item.defaultProps = {
    domRef: ()=>{},
    selected: false,
    onSelect: ()=>{},
    belongsTo: null,
};

export default Item;
