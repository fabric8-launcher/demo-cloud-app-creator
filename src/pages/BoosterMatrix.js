import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';

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
        return response;
    }

    enrichBooster = (booster) => {
        return {
            id: booster.mission + "-" + booster.runtime,
            mission: booster.mission,
            runtime: booster.runtime,
            minishift: this.checkRunsOnCluster(booster, 'local'),
            starter: this.checkRunsOnCluster(booster, 'starter'),
            pro: this.checkRunsOnCluster(booster, 'pro'),
            osio:_.get(booster, 'metadata.osio.enabled',false)
        };
    }

    checkRunsOnCluster = (booster, cluster) => {
        let defaultResult = true;
        let runsOn = _.get(booster, 'metadata.app.launcher.runsOn');
        if (typeof runsOn === 'string') {
          runsOn = [runsOn];
        }
        if (runsOn && runsOn.length !== 0) {
          for (let i = 0; i < runsOn.length; i++) {
            let supportedCategory = runsOn[i];
            if (!supportedCategory.startsWith('!')) {
              defaultResult = false;
            }
            if (supportedCategory.toLowerCase() === 'all'
              || supportedCategory.toLowerCase() === '*'
              || supportedCategory.toLocaleLowerCase() === cluster) {
              return true;
            } else if (supportedCategory.toLowerCase() === 'none'
              || supportedCategory.toLowerCase() === '!*'
              || supportedCategory.toLowerCase() === ('!' + cluster)) {
              return false;
            }
          }
        }
        return defaultResult;
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
                            <Table.HeaderCell textAlign="center">Runs on Minishift?</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Runs on OpenShift Starter Cluster?</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Runs on OpenShift Pro Cluster?</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Runs on OpenShift.io?</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(this.state.runtimes, runtime => this.state.boosters[mission.id + "-" + runtime.id])
                            .filter(booster => booster != null)
                            .map(booster=> (
                                <Table.Row key={booster.id}>
                                    <Table.Cell>{_.capitalize(booster.runtime)}</Table.Cell>
                                    <Table.Cell textAlign="center" positive={booster.minishift} negative={!booster.minishift}>
                                    <Icon color={(booster.minishift && 'green') || (!booster.minishift && 'red')} name={(booster.minishift && 'checkmark') ||
                                            (!booster.minishift && 'close')} size='large' />
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" positive={booster.starter} negative={!booster.starter}>
                                        <Icon color={(booster.starter && 'green') || (!booster.starter && 'red')} name={(booster.starter && 'checkmark') ||
                                            (!booster.starter && 'close')} size='large' />
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" positive={booster.pro} negative={!booster.pro}>
                                        <Icon color={(booster.pro && 'green') || (!booster.pro && 'red')} name={(booster.pro && 'checkmark') ||              (!booster.pro && 'close')} size='large' />
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" positive={booster.osio} negative={!booster.osio}>
                                        <Icon color={(booster.osio && 'green') || (!booster.osio && 'red')} name={(booster.osio && 'checkmark') ||          (!booster.osio && 'close')} size='large' />
                                    </Table.Cell>
                                </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ))}            
            </div>
        )
    }
}