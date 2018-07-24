import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconItem from "./IconItem";

const ConfigMap = (props) => (
    <IconItem className="topo-route" {...props} />
);

ConfigMap.defaultProps = {
    icon: 'file alternate outline',
    klass: 'internal',
};

export default ConfigMap;
