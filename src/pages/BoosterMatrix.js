import React, { Component } from 'react';
import { Image, Table } from 'semantic-ui-react';

export default class BoosterMatrix extends Component {
    state = { boosters:[], runtimes: [], missions: []  }

    componentDidMount() {
        fetch("https://forge.api.openshift.io/api/booster-catalog")
            .then(response => response.json())
            .then(this.normalizeResponse)
    }

    normalizeResponse = response => {
        this.setState({
            boosters: response.boosters,
            runtimes: response.runtimes,
            missions: response.missions
        });
        return response;
    }

    findBooster = (mission, runtime) => {
        let booster = this.state.boosters.find(booster =>  (booster.mission === mission.id && booster.runtime === runtime.id));
        if (booster) {
                return {
                    minishift: booster.metadata.app.launcher.runsOn.includes('local'),
                    starter: booster.metadata.app.launcher.runsOn.includes('starter'),
                    pro: booster.metadata.app.launcher.runsOn.includes('pro'),
                    osio: booster.metadata.osio && booster.metadata.osio.enabled
                };
        }
        return {
            minishift: false,
            starter: false,
            pro: false,
            osio: false
        };
    }


    render() {
        return (
            <div className="booster-matrix">
            {this.state.missions.map(mission => (
                <Table>
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
                        {this.state.runtimes.map(runtime => (
                                // this.findBooster(mission,runtime).map(boosterResult => (
                                    <Table.Row>
                                    <Table.Cell>{runtime.name} <Image src={runtime.logo} size="small"/></Table.Cell>                                    
                                    <Table.Cell>First</Table.Cell>
                                    <Table.Cell negative></Table.Cell>
                                    <Table.Cell>Cell</Table.Cell>
                                    <Table.Cell></Table.Cell>                                    
                                    </Table.Row>
                                // ))
                        ))}
                    </Table.Body>
                </Table>
            ))}            
            </div>
        )
    }
}