import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconItem from "./IconItem";

const Route = (props) => (
    <IconItem className="topo-route" {...props} />
);

Route.defaultProps = {
    icon: 'globe',
    klass: 'external',
};

export default Route;
