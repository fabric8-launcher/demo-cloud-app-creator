import React from 'react';

import IconItem from "./IconItem";

const Route = (props) => (
    <IconItem className="topo-route" {...props} />
);

Route.defaultProps = {
    icon: 'globe',
    klass: 'external',
};

export default Route;
