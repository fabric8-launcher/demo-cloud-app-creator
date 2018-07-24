import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementResizeEvent from 'element-resize-event';
import _ from "lodash";

import { Grid } from 'semantic-ui-react'

import DOMRef from "./DOMRef";
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
            nodeDOMRefs: {},
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
        return (<Node key={id} id={id} {...node} domRef={this.onItemDOMRef} onSelect={this.onSelectItem} selected={this.state.selectedItemId===id} />);
    }

    createEdgeElements = (edges) => {
        return Object.entries(edges).map(([id, edge]) => this.createEdgeElement(id, edge));
    }

    createEdgeElement = (id, edge) => {
        return (<Line key={id} id={id} {...edge} fromNode={this.state.nodeDOMRefs[edge.from]} toNode={this.state.nodeDOMRefs[edge.to]} />);
    }

    onDOMRef = (item, node) => {
        elementResizeEvent(node, this.onResize)
    }

    onItemDOMRef= (item, node) => {
        elementResizeEvent(node, this.onResize)
        this.setState((prevState, props) => {
            return ({ nodeDOMRefs: { ...prevState.nodeDOMRefs, [item.id]: node } });
        });
    }

    onResize = () => {
        if (!_.isEmpty(this.state.nodeDOMRefs)) {
            this.forceUpdate();
        }
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
        let nodeElems = this.createNodeElements(this.props.layout.nodes);
        let serviceElems = nodeElems.filter(e => e.props.klass === 'service');
        let edgeElems = this.createEdgeElements(this.props.layout.edges);
        return (
            <DOMRef domRef={this.onDOMRef}>
                <div className={classNames('topo')}>
                    {serviceElems.map(se => {
                        return (<Grid
                            key={se.props.id}
                            className={classNames('topo-service-stack')}
                            textAlign="center"
                            verticalAlign="middle"
                        >
                            {this.rowForService(nodeElems, "external", "externals", se.props.id)}
                            <Grid.Row columns="1" className="services">
                                <Grid.Column>{se}</Grid.Column>
                            </Grid.Row>
                            {this.rowForService(nodeElems, "internal", "internals", se.props.id)}
                        </Grid>);
                    })}
                    <svg className={classNames('topo-svg')}>
                        {edgeElems}
                    </svg>
                </div>
            </DOMRef>
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
