import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Grid } from 'semantic-ui-react'

import ConfigMap from "./ConfigMap";
import Route from "./Route";
import Service from './Service';
import Storage from "./Storage";
import Line from "./Line";

import './Topology.css';

class Topology extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: null,
        };
    }

    createNodeElements = (nodes) => {
        return Object.entries(nodes).map(([id, node]) => this.createNodeElement(id, node));
    }

    createNodeElement = (id, node) => {
        let Node;
        switch (node.type) {
            case 'configmap': Node = ConfigMap; break;
            case 'route': Node = Route; break;
            case 'service': Node = Service; break;
            case 'storage': Node = Storage; break;
            default: return null;
        }
        return (<Node key={id} id={id} {...node} onSelect={this.onSelectItem} selected={this.state.selectedItemId===id} />);
    }

    createEdgeElements = (edges) => {
        return Object.entries(edges).map(([id, edge]) => this.createEdgeElement(id, edge));
    }

    createEdgeElement = (id, edge) => {
        return (<Line key={id} id={id} {...edge} />);
    }

    onSelectItem = (item) => {
        this.setState({ selectedItemId: item.id });
        this.props.onSelect(this.props.layout.nodes[item.id]);
    }

    rowForService = (elems, klass, className, serviceId) => {
        let columns = this.columnsForService(elems, klass, serviceId);
        return (<Grid.Row columns={columns.length} className={className}>
            {columns}
        </Grid.Row>);
    }

    columnsForService = (elems, klass, serviceId) => {
        let result = elems
            .filter(e => e.props.klass === klass && e.props.belongsTo === serviceId)
            .map(e => (<Grid.Column key={e.props.id}>{e}</Grid.Column>));
        return (result.length > 0) ? result : [<Grid.Column key="empty" />];
    }

    render() {
        let elems = this.createNodeElements(this.props.layout.nodes);
        return (
            <div className={classNames('topo')}>
                {elems.filter(e => e.props.klass === 'service').map(se => {
                    return (<Grid
                        key={se.props.id}
                        className={classNames('topo-service-stack')}
                        textAlign="center"
                        verticalAlign="middle"
                    >
                        {this.rowForService(elems, "external", "externals", se.props.id)}
                        <Grid.Row columns="1" className="services">
                            <Grid.Column>{se}</Grid.Column>
                        </Grid.Row>
                        {this.rowForService(elems, "internal", "internals", se.props.id)}
                    </Grid>);
                })}
            </div>
        );
    }
}

Topology.propTypes = {
    layout: PropTypes.shape({
        nodes: PropTypes.object,
        edges: PropTypes.object,
    }),
    onSelect: PropTypes.func,
};

Topology.defaultProps = {
    layout: {},
    onSelect: ()=>{},
};

export default Topology;
