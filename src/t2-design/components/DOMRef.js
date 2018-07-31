import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

class DOMRef extends React.Component {

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.props.domRef(this.props, node);
    }

    componentWillUnmount() {
        this.props.domRef(this.props, null);
    }

    render() {
        return this.props.children;
    }
}

DOMRef.propTypes = {
    domRef: PropTypes.func,
};

DOMRef.defaultProps = {
    domRef: ()=>{},
};

export default DOMRef;
