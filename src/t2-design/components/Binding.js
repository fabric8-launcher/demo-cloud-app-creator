import React from 'react';

import IconItem from "./IconItem";

const Binding = (props) => (
    <IconItem className="topo-binding" {...props} />
);

Binding.defaultProps = {
    icon: 'exchange',
    klass: 'internal',
};

export default Binding;
