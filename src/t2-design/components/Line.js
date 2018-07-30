import React from 'react';
import PropTypes from 'prop-types';

const Line = (props) => {
    if (props.fromNode && props.toNode) {
        return (
            <path
                d={pathDimensions(...calculateAnchorPoints(props.canvasNode, props.fromNode, props.toNode))}
                style={{stroke: 'black', strokeWidth: '3px', fill: 'none', strokeOpacity: props.suggested ? 0.4 : 1.0 }} />
        )
    } else {
        return null;
    }
}

const pathDimensions = (x1, y1, x2, y2) => `M${x1},${y1} L${x2},${y2}`;

const getBounds = (parent, elem) => {
    let parentRect = parent.getBoundingClientRect();
    let elemRect = elem.getBoundingClientRect();
    return {
        x: elemRect.x - parentRect.x,
        y: elemRect.y - parentRect.y,
        width: elemRect.width,
        height: elemRect.height,
    };
}

const calculateAnchorPoints = (parent, from, to) => {
    let fromRect = getBounds(parent, from);
    let toRect = getBounds(parent, to);
    return [fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height / 2.0, toRect.x + toRect.width / 2.0, toRect.y + toRect.height / 2.0];
}

Line.propTypes = {
    fromNode: PropTypes.object,
    toNode: PropTypes.object,
    type: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    suggested: PropTypes.bool,
};

Line.defaultProps = {
    type: 'line',
    selected: false,
    onSelect: ()=>{},
    suggested: false,
};

export default Line;
