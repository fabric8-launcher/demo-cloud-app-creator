import React from 'react';

import IconItem from "./IconItem";

const Storage = (props) => (
    <IconItem className="topo-storage" {...props} />
);

Storage.defaultProps = {
    icon: 'disk',
    klass: 'internal',
};

export default Storage;
