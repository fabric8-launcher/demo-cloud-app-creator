import React from 'react';
import classNames from 'classnames';
import _ from "lodash";

import {Checkbox, Form, Step} from 'semantic-ui-react'

import Topology from "./components/Topology";

import './DiagramWithSteps.css';

const step1 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ', suggested: true},
        cm1: {type: 'configmap', name: 'Message Broker Auth', suggested: true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1', suggested: true},
    }
};

const step2 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ'},
        cm1: {type: 'configmap', name: 'Message Broker Auth'},
        s2: {type: 'service', name: 'Listener: to Database', suggested: true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1'},
        l2: {from: 's2', to: 'cm1', suggested: true},
    }
};

const step3 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ'},
        cm1: {type: 'configmap', name: 'Message Broker Auth'},
        s2: {type: 'service', name: 'Listener: to Database'},
        s3: {type: 'service', name: 'Database: PostgreSQL', suggested: true},
        cm2: {type: 'configmap', name: 'Database Auth', suggested: true},
        v1: {type: 'storage', name: 'Database Storage', suggested: true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1'},
        l2: {from: 's2', to: 'cm1'},
        l3: {from: 's3', to: 'cm2', suggested: true},
        l4: {from: 's3', to: 'v1', suggested: true},
        l5: {from: 's2', to: 'cm2', suggested: true},
    }
};

const step4 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ'},
        cm1: {type: 'configmap', name: 'Message Broker Auth'},
        s2: {type: 'service', name: 'Listener: to Database'},
        s3: {type: 'service', name: 'Database: PostgreSQL'},
        cm2: {type: 'configmap', name: 'Database Auth'},
        v1: {type: 'storage', name: 'Database Storage'},
    },
    edges: {
        l1: {from: 's1', to: 'cm1'},
        l2: {from: 's2', to: 'cm1'},
        l3: {from: 's3', to: 'cm2'},
        l4: {from: 's3', to: 'v1'},
        l5: {from: 's2', to: 'cm2'},
    }
};

class DiagramWithTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: null,
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

    startStep = () => (
        <Step onClick={() => this.setState({layout: step1})}>
            <Step.Content>
                <Step.Title>A Messaging App</Step.Title>
                <Step.Description>Let's create a messaging application</Step.Description>
                <Step.Description><a>Click here to Start</a></Step.Description>
            </Step.Content>
        </Step>
    )

    amqStep = () => (
        <Step onClick={() => this.setState({layout: step1})}>
            <Step.Content>
                <Step.Title>Message Broker: AMQ</Step.Title>
                <Step.Description>A message broker based on Red Hat AMQ.</Step.Description>
                <Form>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Queue (one listener)'
                            name='queue'
                            value='this'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Topic (many listeners)'
                            name='topic'
                            value='this'
                        />
                    </Form.Field>
                </Form>
            </Step.Content>
        </Step>
    )

    listenerStep = () => (
        <Step onClick={() => this.setState({layout: step2})}>
            <Step.Content>
                <Step.Title>Listener</Step.Title>
                <Step.Description>What kind of listener do you want for your messages?</Step.Description>
                <Form>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Write messages to log'
                            name='simple'
                            value='this'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Write messages to database'
                            name='database'
                            value='this'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Some other message sinkn'
                            name='other'
                            value='this'
                        />
                    </Form.Field>
                </Form>
            </Step.Content>
        </Step>
    )

    dbStep = () => (
        <Step>
            <Step.Content>
                <Step.Title>Database</Step.Title>
                <Step.Description>What database do you want to use?</Step.Description>
                <Form>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Create local database'
                            name='create'
                            value='this'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Connect to local database'
                            name='local'
                            value='this'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Connect to external database'
                            name='other'
                            value='this'
                        />
                    </Form.Field>
                </Form>
            </Step.Content>
        </Step>
    )

    dbCreateStep = () => (
        <Step onClick={() => this.setState({layout: step3})}>
            <Step.Content>
                <Step.Title>Database</Step.Title>
                <Step.Description>What database do you want to use?</Step.Description>
                <Form>
                    <Form.Select label="Type" options={[
                        { key: 'psql', text: 'PostgresQL', value: 'postgresql' },
                        { key: 'mysql', text: 'mySQL', value: 'mysql' },
                    ]} placeholder="Database" required />
                    <Form.Input label="Name" placeholder="Name" required />
                    <Form.Button label="Schema">Import...</Form.Button>
                    <Form.Input label="User" placeholder="User" required />
                    <Form.Input label="Password" type="password" required />
                </Form>
            </Step.Content>
        </Step>
    )

    generateStep = () => (
        <Step onClick={() => this.setState({layout: step4})}>
            <Step.Content>
                <Step.Title>Database</Step.Title>
                <Step.Description>What database do you want to use?</Step.Description>
                <Form>
                    <Form.Field>
                        <Form.Button>Generate</Form.Button>
                    </Form.Field>
                </Form>
            </Step.Content>
        </Step>
    )

    onSelectItem = (id, item) => {
        this.setState({selectedItemId: id});
    }

    render() {
        return (
            <div className={classNames("t3-design-withsteps")}>
                <table>
                    <tbody>
                        <tr>
                            <td className={classNames("stepscell")}>
                                <Step.Group fluid vertical>
                                    { this.startStep() }
                                    { this.amqStep() }
                                    { this.listenerStep() }
                                    { this.dbStep() }
                                    { this.dbCreateStep() }
                                    { this.generateStep() }
                                </Step.Group>
                            </td>
                            <td className={classNames("topocell")}>
                                <Topology layout={this.state.layout} onSelect={this.onSelectItem}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DiagramWithTemplate;
