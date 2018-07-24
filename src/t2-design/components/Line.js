import React from 'react';
import PropTypes from 'prop-types';

const Line = (props) => (
    <svg></svg>
);

Line.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
};

Line.defaultProps = {
    type: 'line',
    selected: false,
    onSelect: ()=>{},
};

export default Line;
