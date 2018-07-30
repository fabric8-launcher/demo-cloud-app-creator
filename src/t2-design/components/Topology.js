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
            topoDOMRef: null,
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
        return (<Line key={id} id={id} {...edge} canvasNode={this.state.topoDOMRef} fromNode={this.state.nodeDOMRefs[edge.from]} toNode={this.state.nodeDOMRefs[edge.to]} />);
    }

    onDOMRef = (item, node) => {
        if (node != null) {
            elementResizeEvent(node, this.onResize);
        }
        this.setState({
            topoDOMRef: node
        });
    }

    onItemDOMRef= (item, node) => {
        if (node != null) {
            elementResizeEvent(node, this.onResize);
        }
        this.setState((prevState, props) => {
            return ({nodeDOMRefs: {...prevState.nodeDOMRefs, [item.id]: node}});
        });
    }

    onResize = () => {
        if (!_.isEmpty(this.state.nodeDOMRefs)) {
            this.forceUpdate();
        }
    }

    onSelectItem = (item) => {
        this.setState({ selectedItemId: item.id });
        this.props.onSelect(item.id, this.props.layout.nodes[item.id]);
    }

    rowForService = (elems, className, serviceId) => {
        let columns = this.columnsForService(elems, serviceId);
        return (<Grid.Row columns={columns.length} className={className}>
            {columns}
        </Grid.Row>);
    }

    columnsForService = (elems, serviceId) => {
        let result = elems
            .filter(e => e.props.belongsTo === serviceId)
            .map(e => (<Grid.Column key={e.props.id}>{e}</Grid.Column>));
        return (result.length > 0) ? result : [<Grid.Column key="empty" />];
    }

    determineBelongsToFromEdges = (layout) => {
        Object.entries(layout.nodes)
            .filter(([nid, node]) => node.type !== 'service' && !node.belongsTo)
            .forEach(([nid, node]) => {
                let connected = Object.entries(layout.edges).filter(([eid, edge]) => edge.from === nid || edge.to === nid);
                if (connected.length > 0) {
                    let edge = connected[0][1];
                    node.belongsTo = (edge.from === nid) ? edge.to : edge.from;
                }
            });
    }

    distributeOrphans = (layout) => {
        let services = Object.entries(layout.nodes).filter(([nid, node]) => node.type === 'service');
        let orphans = Object.entries(layout.nodes).filter(([nid, node]) => node.type !== 'service' && !node.belongsTo).map(([nid, node]) => node);
        while (orphans.length > 0) {
            let orphan = orphans.pop();
            services.sort(([aid, a], [bid, b]) => this.countServiceBelong(layout, aid) - this.countServiceBelong(layout, bid));
            orphan.belongsTo = services[0][0];
        }
    }

    countServiceBelong = (layout, sid) =>
        Object.entries(layout.nodes).filter(([nid, node]) => node.type !== 'service' && node.belongsTo === sid).length;

    render() {
        var layout = _.cloneDeep(this.props.layout);
        this.determineBelongsToFromEdges(layout);
        this.distributeOrphans(layout);
        let nodeElems = this.createNodeElements(layout.nodes);
        let serviceElems = nodeElems.filter(e => e.props.klass === 'service');
        let externalElems = nodeElems.filter(e => e.props.klass === 'external');
        let internalElems = nodeElems.filter(e => e.props.klass === 'internal');
        let edgeElems = this.createEdgeElements(layout.edges);
        return (
            <DOMRef domRef={this.onDOMRef}>
                <div className={classNames('topo')}>
                    {serviceElems.map(se => {
                        return (<Grid
                            key={se.props.id}
                            className={classNames('topo-service-stack')}
                            textAlign="center"
                            verticalAlign="middle"
                            stackable={false}
                        >
                            {this.rowForService(externalElems, "externals", se.props.id)}
                            <Grid.Row columns="1" className="services">
                                <Grid.Column>{se}</Grid.Column>
                            </Grid.Row>
                            {this.rowForService(internalElems, "internals", se.props.id)}
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
