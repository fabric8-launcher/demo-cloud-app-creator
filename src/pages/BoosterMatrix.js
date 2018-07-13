import _ from 'lodash';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class BoosterMatrix extends Component {
    state = { boosters:{}, runtimes: [], missions: []  }

    componentDidMount() {
        fetch("https://forge.api.openshift.io/api/booster-catalog")
            .then(response => response.json())
            .then(this.normalizeResponse)
    }

    normalizeResponse = response => {
        this.setState({
            missions: response.missions,
            runtimes: response.runtimes,
            boosters: _.keyBy(response.boosters.map(this.enrichBooster), 
                booster => booster.mission + "-" + booster.runtime)
        });
        console.log(this.state.boosters)
        return response;
    }

    enrichBooster = (booster) => {
        return {
            id: booster.mission + "-" + booster.runtime,
            mission: booster.mission,
            runtime: booster.runtime,
            minishift: _.get(booster, 'metadata.app.launcher.runsOn',[]).includes('local'),
            starter: _.get(booster, 'metadata.app.launcher.runsOn',[]).includes('starter'),
            pro: _.get(booster, 'metadata.app.launcher.runsOn',[]).includes('pro'),
            osio:_.get(booster, 'metadata.osio.enabled',false)
        };
    }

    render() {
        return (
            <div className="booster-matrix">
            {this.state.missions.map(mission => (
                <Table key={mission.id}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="5" singleLine>{mission.name}</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Runtime</Table.HeaderCell>
                            <Table.HeaderCell>Runs on Minishift?</Table.HeaderCell>
                            <Table.HeaderCell>Runs on OpenShift Starter Cluster?</Table.HeaderCell>
                            <Table.HeaderCell>Runs on OpenShift Pro Cluster?</Table.HeaderCell>
                            <Table.HeaderCell>Runs on OpenShift.io?</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {/* {_.map(this.state.runtimes, runtime => this.state.boosters[mission.id + "-" + runtime.id])
                            .map(booster=> (
                                <Table.Row key={booster}>
                                    <Table.Cell>{booster}</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell negative></Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell></Table.Cell>                                    
                                </Table.Row>
                        ))} */}
                    </Table.Body>
                </Table>
            ))}            
            </div>
        )
    }
}