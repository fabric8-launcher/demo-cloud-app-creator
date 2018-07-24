import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconItem from "./IconItem";

const Storage = (props) => (
    <IconItem className="topo-route" {...props} />
);

Storage.defaultProps = {
    icon: 'disk',
    klass: 'internal',
};

export default Storage;
