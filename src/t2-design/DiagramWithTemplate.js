import React from 'react';
import classNames from 'classnames';
import _ from "lodash";

import { Form } from 'semantic-ui-react'

import Topology from "./components/Topology";

import './DiagramWithTemplate.css';

class DiagramWithTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: null,
            templateJson: null,
            layout: {
                nodes: {
                    r1: {type: 'route', belongsTo: 's1'},
                    s1: {type: 'service', name: 'Placeholder'},
                    d1: {type: 'storage', belongsTo: 's1'},
                },
                edges: {
                    l1: {from: 'r1', to: 's1'},
                    l2: {from: 's1', to: 'd1'},
                }
            }
        };
    }

    componentDidMount() {
        fetch("/app.json")
            .then(response => response.text())
            .then(text => this.updateLayoutFromText(text));
    }

    updateLayoutFromText = (text) => {
        let json = JSON.parse(text);
        this.setState({templateText: text, templateJson: json, layout: this.templateToLayout(json)})
    }

    templateToLayout = (template) => {
        let layout = { nodes: {}, edges: {} };

        // First find and transform our "services"
        this.itemsByKind(template, "DeploymentConfig").forEach(item => this.transformDeploymentConfig(layout, template, item));

        // Find and transform Routes
        this.itemsByKind(template, "Route").forEach(item => this.transformRoute(layout, template, item));

        // Find and transform ConfigMaps
        this.itemsByKind(template, "ConfigMap").forEach(item => this.transformConfigMap(layout, template, item));

        // Find and transform PersistentVolumeClaims
        this.itemsByKind(template, "PersistentVolumeClaim").forEach(item => this.transformPersistentVolumeClaim(layout, template, item));

        return layout;
    }

    // DeploymentConfigs, BuildConfigs and Services

    transformDeploymentConfig = (layout, template, item) => {
        let hasBC = this.itemsByKind(template, "BuildConfig").filter(i => i.metadata.name === item.metadata.name).length > 0;
        let services = this.itemsByKind(template, "Service").filter(i => this.deploymentConfigSelector(i) === item.metadata.name).map(i => i.metadata.name);
        layout.nodes[this.serviceId(item)] = ({ type: 'service', name: item.metadata.name, hasBuildConfig: hasBC, services: services });
    }

    serviceId = (item) => this.serviceIdFromName(item.metadata.name);

    serviceIdFromName = (name) => 'srv-' + name;

    // Routes

    transformRoute = (layout, template, item) => {
        let id = this.routeId(item);
        let to = this.routeBelongsTo(layout, template, item);
        layout.nodes[id] = ({ type: 'route', name: item.metadata.name, belongsTo: to });
        layout.edges[id+"-"+to] = ({ type: 'line', from: id, to: to });
    }

    routeBelongsTo = (layout, template, item) => {
        let srvKind = item.spec.to.kind;
        let srvName = item.spec.to.name;
        let items = this.itemsByKind(template, srvKind).filter(i => i.metadata.name === srvName);
        return this.serviceIdFromName(this.deploymentConfigSelector(items[0]));
    }

    routeId = (item) => 'r-' + item.metadata.name;

    // ConfigMaps

    transformConfigMap = (layout, template, item) => {
        let id = this.configMapId(item);
        layout.nodes[id] = ({ type: 'configmap', name: item.metadata.name });

        // Try making connections
        this.itemsByKind(template, "DeploymentConfig")
            .filter(i => _.get(i, 'spec.template.spec.containers', [])
                .filter(v => _.get(v, 'env', [])
                    .filter(e => _.get(e, 'valueFrom.configMapKeyRef.name') === item.metadata.name).length > 0).length > 0)
            .forEach(s => {
                let to = this.serviceId(s);
                layout.edges[id+"-"+to] = ({ type: 'line', from: id, to: to });
            });
    }

    configMapId = (item) => 'cm-' + item.metadata.name;

    // PersistentVolumeClaims

    transformPersistentVolumeClaim = (layout, template, item) => {
        let id = this.persistentVolumeClaimId(item);
        layout.nodes[id] = ({ type: 'storage', name: item.metadata.name });

        // Try making connections
        this.itemsByKind(template, "DeploymentConfig")
            .filter(i => _.get(i, 'spec.template.spec.volumes', [])
                .filter(v => _.get(v, 'persistentVolumeClaim.claimName') === item.metadata.name).length > 0)
            .forEach(s => {
                let to = this.serviceId(s);
                layout.edges[id+"-"+to] = ({ type: 'line', from: id, to: to });
            });
    }

    persistentVolumeClaimId = (item) => 'pvc-' + item.metadata.name;

    deploymentConfigSelector = (item) => _.get(item, 'spec.selector.deploymentconfig', _.get(item, 'spec.selector.deploymentConfig'));

    itemsByKind = (template, kind) =>
        template.items.filter(i => kind.toLowerCase() === i.kind.toLowerCase());

    onSelectItem = (id, item) => {
        this.setState({selectedItemId: id});
    }

    render() {
        return (
            <div className={classNames("t2-design-withtemplate")}>
                <table>
                    <tbody>
                        <tr>
                            <td className={classNames("topocell")}>
                                <Topology layout={this.state.layout} onSelect={this.onSelectItem}/>
                            </td>
                            <td className={classNames("templatecell")}>
                                <div className={classNames("templatecontainer")}>
                                    <Form>
                                        <Form.TextArea
                                            className={classNames("templatebox")}
                                            value={this.state.templateText}
                                            onChange={(e, t) => this.setState({templateText: t.value})}
                                            wrap="off" />
                                        <Form.Button onClick={() => this.updateLayoutFromText(this.state.templateText)}>Apply</Form.Button>
                                    </Form>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DiagramWithTemplate;
