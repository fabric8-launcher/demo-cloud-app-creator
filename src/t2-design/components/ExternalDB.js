import React from 'react';

import IconItem from "./IconItem";

const ExternalDB = (props) => (
    <IconItem className="topo-extdb" {...props} />
);

ExternalDB.defaultProps = {
    icon: 'database',
    klass: 'internal',
};

export default ExternalDB;
