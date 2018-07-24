import React from 'react';
import PropTypes from 'prop-types';

const Line = (props) => {
    if (props.fromNode && props.toNode) {
        return (
            <path
                d={pathDimensions(...calculateAnchorPoints(props.fromNode, props.toNode))}
                style={{stroke: 'black', strokeWidth: '3px', fill: 'none' }} />
        )
    } else {
        return null;
    }
}

const pathDimensions = (x1, y1, x2, y2) => `M${x1},${y1} L${x2},${y2}`;

const calculateAnchorPoints = (from, to) => {
    let fromRect = from.getBoundingClientRect();
    let toRect = to.getBoundingClientRect();
    return [fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height / 2.0, toRect.x + toRect.width / 2.0, toRect.y + toRect.height / 2.0];
}

Line.propTypes = {
    fromNode: PropTypes.object,
    toNode: PropTypes.object,
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
