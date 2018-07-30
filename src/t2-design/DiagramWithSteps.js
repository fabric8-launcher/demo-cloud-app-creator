import classNames from 'classnames';
import React from 'react';
import _ from "lodash";

import { Checkbox, Dropdown, Form, Grid, List, Segment, Step } from 'semantic-ui-react';

import DOMRef from "./components/DOMRef";
import Topology from "./components/Topology";

import './DiagramWithSteps.css';

const empty = {
    nodes: {
    },
    edges: {
    }
};

const amqLayout = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ', services: ['dummy'], suggested: true},
        cm1: {type: 'configmap', name: 'Message Broker Auth', suggested: true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1', suggested: true},
    }
};

const listenerLayout = {
    nodes: {
        s2: {type: 'service', name: 'Listener: to Database', hasBuildConfig: true, suggested: true},
    },
    edges: {
        l2: {from: 's2', to: 's1', suggested: true},
    }
};

const dbCreateLayout = {
    nodes: {
        s3: {type: 'service', name: 'Database: PostgreSQL', services: ['dummy'], suggested: true},
        cm2: {type: 'configmap', name: 'Database Auth', suggested: true},
        v1: {type: 'storage', name: 'Database Storage', suggested: true},
    },
    edges: {
        l3: {from: 's3', to: 'cm2', suggested: true},
        l4: {from: 's3', to: 'v1', suggested: true},
        l5: {from: 's2', to: 's3', suggested: true},
    }
};

const restLayout = {
    nodes: {
        s4: {type: 'service', name: 'REST API', services: ['dummy'], hasBuildConfig: true, suggested:true},
        r1: {type: 'route', suggested:true},
    },
    edges: {
        l6: {from: 's4', to: 'r1', suggested:true},
        l7: {from: 's4', to: 's3', suggested:true},
    }
};

class DiagramWithTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: null,
            steps: [],
            layout: empty,
        };
    }

    scrollIntoView = (props, node) => node && node.scrollIntoView();

    unsuggest = (items) => _.fromPairs(
        Object.entries(items)
            .map(([k,v]) => (v.suggested) ? [k,{...v, suggested:false}] : [k,v])
    );

    pushStep = (layout) => {
        this.setState((prevState, props) => {
            let newSteps = [ ...prevState.steps, prevState.layout ];
            let newLayout = {
                nodes: { ...this.unsuggest(prevState.layout.nodes), ...layout.nodes },
                edges: { ...this.unsuggest(prevState.layout.edges), ...layout.edges },
            };
            return { steps: newSteps, layout: newLayout };
        });
    }

    buttonStep = (layout, title="OK") => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step onClick={() => this.pushStep(layout)}>
                <Step.Content>
                    <Form>
                        <Form.Field>
                            <Form.Button>{title}</Form.Button>
                        </Form.Field>
                    </Form>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    startStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step>
                <Step.Content>
                    <Step.Title>A Messaging App</Step.Title>
                    <Step.Description>Let's create a messaging application</Step.Description>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    startButtonStep = () => this.buttonStep(amqLayout, "Start");

    amqStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step onClick={() => this.pushStep(empty)}>
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
        </DOMRef>
    )

    listenerStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step>
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
                                label='Some other message sink'
                                name='other'
                                value='this'
                            />
                        </Form.Field>
                        <Form.Select label="Runtime" options={[
                            { key: 'vertx', text: 'Vert.x', value: 'vertx' },
                            { key: 'sb', text: 'Spring Boot', value: 'springb' },
                            { key: 'nodejs', text: 'NodeJs', value: 'nodejs' },
                            { key: 'wf', text: 'Wildfly', value: 'wildfly' },
                        ]} placeholder="Runtime" required />
                        <Form.Select label="Version" options={[
                            { key: 'com', text: 'Community', value: 'community' },
                            { key: 'rh', text: 'Red Hat', value: 'redhat' },
                        ]} placeholder="Version" required />
                    </Form>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    listenerButtonStep = () => this.buttonStep(listenerLayout, "OK");

    dbStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step onClick={() => this.pushStep(empty)}>
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
        </DOMRef>
    )

    dbCreateStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step>
                <Step.Content>
                    <Step.Title>Create Local Database</Step.Title>
                    <Step.Description>What database do you want to use?</Step.Description>
                    <Form>
                        <Dropdown placeholder='Database' label="Type" fluid selection
                            options={[
                                { key: 'psql', text: 'PostgreSQL', value: 'postgresql', image: 'https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg' },
                                { key: 'mysql', text: 'MySQL', value: 'mysql', image: 'https://www.mysql.com/common/logos/logo-mysql-170x115.png' },
                            ]} placeholder="Database" required />
                        <Form.Input label="Name" placeholder="Name" required />
                        <Form.Button label="Schema">Import...</Form.Button>
                        <Form.Input label="User" placeholder="User" required />
                        <Form.Input label="Password" type="password" required />
                    </Form>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    dbCreateButtonStep = () => this.buttonStep(dbCreateLayout, "OK");

    restStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step>
                <Step.Content>
                    <Step.Title>REST API</Step.Title>
                    <Step.Description>Let's create a REST API to access the messages stored in the database</Step.Description>
                    <Form>
                        <Form.Select label="Runtime" options={[
                            { key: 'vertx', text: 'Vert.x', value: 'vertx' },
                            { key: 'sb', text: 'Spring Boot', value: 'springb' },
                            { key: 'nodejs', text: 'NodeJs', value: 'nodejs' },
                            { key: 'wf', text: 'Wildfly', value: 'wildfly' },
                        ]} placeholder="Runtime" required />
                        <Form.Select label="Version" options={[
                            { key: 'com', text: 'Community', value: 'community' },
                            { key: 'rh', text: 'Red Hat', value: 'redhat' },
                        ]} placeholder="Version" required />
                    </Form>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    restButtonStep = () => this.buttonStep(restLayout, "OK");

    generateButtonStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step>
                <Step.Content>
                    <Step.Title>Generate Application</Step.Title>
                    <Step.Description>You are now ready to generate your application</Step.Description>
                    <Form>
                        <Form.Input label="Application Name" placeholder="Name" value="my-app" required />
                        <Form.Input label="Maven Artifact" value="booster" required />
                        <Form.Input label="Maven Version" value="1.0.0-SNAPSHOT" required />
                        <Form.Input label="Maven Group ID" value="io.openshift" required />
                        <Form.Button primary icon="cloud upload" labelPosition="right" content="Deploy" onClick={() => this.pushStep(empty)} />
                    </Form>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    infoStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step>
                <Step.Content>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <h2>While you wait</h2>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <a>Take a look at your build</a><br/>
                                <i>This will take a couple of minutes</i>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <h2>Your next step</h2>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                Next Steps: Update your booster using Continuous Delivery<br/>
                                Your booster is automatically configured to build and deploy with new commits.
                                <List ordered>
                                    <List.Item>Clone your project from GitHub.
                                        <Segment secondary>$ git clone https://github.com/someuser/my-app</Segment>
                                    </List.Item>
                                    <List.Item>Open your project in your desired IDE or editor.</List.Item>
                                    <List.Item>Perform any updates you want to the project.</List.Item>
                                    <List.Item>Commit and push your changes back to GitHub.
                                        <Segment secondary>$ git add .<br/>
                                            $ git commit -m "Made an update"<br/>
                                            $ git push</Segment>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <a onClick={() => this.setState({layout: empty, steps: []})}>Create new application</a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    onSelectItem = (id, item) => {
        this.setState({selectedItemId: id});
    }

    render() {
        let showSteps = this.state.steps.length;
        return (
            <div className={classNames("t3-design-withsteps")}>
                <div className={classNames("left-panel")}>
                    <Step.Group fluid vertical>
                        { showSteps < 7 && this.startStep() }
                        { showSteps == 0 && this.startButtonStep() }
                        { showSteps >= 1 && showSteps < 7 && this.amqStep() }
                        { showSteps >= 2 && showSteps < 7 && this.listenerStep() }
                        { showSteps == 2 && this.listenerButtonStep() }
                        { showSteps >= 3 && showSteps < 7 && this.dbStep() }
                        { showSteps >= 4 && showSteps < 7 && this.dbCreateStep() }
                        { showSteps == 4 && this.dbCreateButtonStep() }
                        { showSteps >= 5 && showSteps < 7 && this.restStep() }
                        { showSteps == 5 && this.restButtonStep() }
                        { showSteps >= 6 && showSteps < 7 && this.generateButtonStep() }
                        { showSteps >= 7 && this.infoStep() }
                    </Step.Group>
                </div>
                <div className={classNames("main-panel")}>
                    <Topology layout={this.state.layout} onSelect={this.onSelectItem}/>
                </div>
            </div>
        );
    }
}

export default DiagramWithTemplate;
