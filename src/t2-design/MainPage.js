import React from 'react';
import PropTypes from "prop-types";

import Topology from "./components/Topology";

import './MainPage.css';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: null,
        };
    }

    onSelectItem = (item) => {
        this.setState({selectedItemId: item.id});
    }

    render() {
        let topo = {
            nodes: {
                r1: {type: 'route', belongsTo: 's1'},
                s1: {type: 'service', name: 'Vert.x'},
                s2: {type: 'service', name: 'PostgreSQL', icon: 'database'},
                s3: {type: 'service', name: 'AMQ Broker', icon: 'envelope outline'},
                cm1: {type: 'configmap', belongsTo: 's2'},
                d1: {type: 'storage', belongsTo: 's2'},
            },
            edges: {
                l1: {from: 'r1', to: 's1'},
                l2: {from: 's1', to: 'cm1'},
                l3: {from: 's2', to: 'cm1'},
                l4: {from: 's2', to: 'd1'},
            }
        };
        return (
            <div className="t2-design-mainpage">
                <Topology layout={topo} onSelect={console.log}/>
            </div>
        );
    }
}

export default MainPage;
