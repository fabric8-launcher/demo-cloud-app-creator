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

const listenerLayout = {
    nodes: {
        s2: {type: 'service', name: 'Listener: to Database', hasBuildConfig: true, suggested: true},
    },
    edges: {
        l2: {from: 's2', to: 'mb1', suggested: true},
    }
};

const restLayout = {
    nodes: {
        s4: {type: 'service', name: 'REST API', services: ['dummy'], hasBuildConfig: true, suggested:true},
        r1: {type: 'route', suggested:true},
    },
    edges: {
        l6: {from: 's4', to: 'r1', suggested:true},
        l7: {from: 's4', to: 'db1', suggested:true},
    }
};

class DiagramWithTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: null,
            layout: empty,
            steps: [ this.startStep ],
            forms: {},
            history: [],
        };
    }

    fieldHandler = (e, { name, value }) => {
        this.setState((prevState, props) => {
            let newForms = { ...prevState.forms, [name]: value };
            return { forms: newForms };
        });
    }

    scrollIntoView = (props, node) => node && node.scrollIntoView();

    unsuggest = (items) => _.fromPairs(
        Object.entries(items)
            .map(([k,v]) => (v.suggested) ? [k,{...v, suggested:false}] : [k,v])
    );

    pushStep = (layout, nextStep, append=true) => {
        this.setState((prevState, props) => {
            let newHistory = [ ...prevState.history, {
                layout: _.cloneDeep(prevState.layout),
                steps: _.cloneDeep(prevState.steps ),
                forms: _.cloneDeep(prevState.forms ),
            } ];
            let newLayout = {
                nodes: { ...this.unsuggest(prevState.layout.nodes), ...layout.nodes },
                edges: { ...this.unsuggest(prevState.layout.edges), ...layout.edges },
            };
            let newSteps = append ? [ ...prevState.steps, nextStep ] : [ nextStep ];
            return { layout: newLayout, steps: newSteps, history: newHistory };
        });
    }

    buttonStep = (layout, nextStep, title="OK") => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step onClick={() => this.pushStep(layout, nextStep)}>
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

    startStep = (props) => {
        return [
            (
                <DOMRef domRef={this.scrollIntoView}>
                    <Step>
                        <Step.Content>
                            <Step.Title>A Messaging App</Step.Title>
                            <Step.Description>Let's create a messaging application</Step.Description>
                        </Step.Content>
                    </Step>
                </DOMRef>
            ),
            props.isLast && this.buttonStep(empty, this.amqStep, "Start")
        ];
    }

    amqStep = (props) => {
        const amqCreateLayout = {
            nodes: {
                mb1: {type: 'service', name: 'Message Broker: AMQ', services: ['dummy'], suggested: true},
                cm1: {type: 'configmap', name: 'Message Broker Auth', suggested: true},
            },
            edges: {
                l1: {from: 'mb1', to: 'cm1', suggested: true},
            }
        };
        const amqExistingLayout = {
            nodes: {
                mb1: {type: 'binding', suggested: true},
            },
            edges: {
            }
        };
        return (
            <DOMRef domRef={this.scrollIntoView}>
                <Step>
                    <Step.Content>
                        <Step.Title>Message Broker</Step.Title>
                        <Step.Description>What message broker do you want to use?</Step.Description>
                        <Form>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Create local message broker'
                                    name='broker'
                                    value='create'
                                    onClick={() => this.pushStep(amqCreateLayout, this.amqCreateStep)}
                                    checked={this.state.forms.broker === 'create'}
                                    onChange={this.fieldHandler}
                                    disabled={this.state.forms.broker}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Connect to existing message broker'
                                    name='broker'
                                    value='local'
                                    onClick={() => this.pushStep(amqExistingLayout, this.amqExistingStep)}
                                    checked={this.state.forms.broker === 'local'}
                                    onChange={this.fieldHandler}
                                    disabled={this.state.forms.broker}
                                />
                            </Form.Field>
                        </Form>
                    </Step.Content>
                </Step>
            </DOMRef>
        )
    }

    amqCreateStep = (props) => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step>
                <Step.Content>
                    <Step.Title>Message Broker: AMQ</Step.Title>
                    <Step.Description>A message broker based on Red Hat AMQ.</Step.Description>
                    <Form>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='Queue (one listener)'
                                name='amq'
                                value='queue'
                                checked={this.state.forms.amq === 'queue'}
                                onChange={this.fieldHandler}
                                onClick={() => this.pushStep(listenerLayout, this.listenerStep)}
                                disabled={this.state.forms.amq}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='Topic (many listeners)'
                                name='amq'
                                value='topic'
                                checked={this.state.forms.amq === 'topic'}
                                onChange={this.fieldHandler}
                                onClick={() => this.pushStep(listenerLayout, this.listenerStep)}
                                disabled={this.state.forms.amq}
                            />
                        </Form.Field>
                    </Form>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    amqExistingStep = (props) => {
        return [
            (
                <DOMRef domRef={this.scrollIntoView}>
                    <Step>
                        <Step.Content>
                            <Step.Title>Connect To Existing Message Broker</Step.Title>
                            <Step.Description>Connect to the message broker you want to use</Step.Description>
                            <Form>
                                <Form.Button label="Schema">Authenticate...</Form.Button>
                                <Dropdown placeholder='Select Cluster' label="Cluster" fluid selection
                                          options={[
                                              { key: 'prouse1', text: 'Pro US East 1', value: 'pro-us-east-1' },
                                              { key: 'prousw1', text: 'Pro US West 1', value: 'pro-us-west-1' },
                                              { key: 'proeuw1', text: 'Pro EU West 1', value: 'pro-eu-west-1' },
                                              { key: 'proapse2', text: 'Pro AP Southeast 2', value: 'pro-ap-southeast-2' },
                                          ]} required />
                                <Dropdown placeholder='Select Message Broker' label="Message Broker" fluid selection
                                          options={[
                                              { key: 'db1', text: 'twinkly-sunshine', value: 'db1' },
                                              { key: 'db2', text: 'catty-kitten-prod', value: 'db2' },
                                              { key: 'db3', text: 'theatrial-insights', value: 'db3' },
                                          ]} required />
                                <Dropdown placeholder='Select Queue or Topic' label="Queue / Topic" fluid selection
                                          options={[
                                              { key: 'q1', text: 'incoming-kittens', value: 'q1' },
                                              { key: 'q2', text: 'received-reindeer', value: 'q2' },
                                              { key: 'q3', text: 'notified-narwhals', value: 'q3' },
                                          ]} required />
                            </Form>
                        </Step.Content>
                    </Step>
                </DOMRef>
            ),
            props.isLast && this.buttonStep(listenerLayout, this.listenerStep)
        ];
    }

    listenerStep = (props) => {
        return [
            (
                <DOMRef domRef={this.scrollIntoView}>
                    <Step>
                        <Step.Content>
                            <Step.Title>Listener</Step.Title>
                            <Step.Description>Message listeners are the application pieces which receive a message and may take some action. What kind of listener do you want for your messages?</Step.Description>
                            <Form>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='Write messages to log'
                                        name='listener'
                                        value='simple'
                                        checked={this.state.forms.listener === 'simple'}
                                        onChange={this.fieldHandler}
                                        disabled={this.state.forms.listener}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='Write messages to database'
                                        name='listener'
                                        value='database'
                                        checked={this.state.forms.listener === 'database'}
                                        onChange={this.fieldHandler}
                                        disabled={this.state.forms.listener}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='Some other message sink'
                                        name='listener'
                                        value='other'
                                        checked={this.state.forms.listener === 'other'}
                                        onChange={this.fieldHandler}
                                        disabled={this.state.forms.listener}
                                    />
                                </Form.Field>
                                <Form.Select label="Runtime" options={[
                                    { key: 'vertx', text: 'Vert.x', value: 'vertx' },
                                    { key: 'sb', text: 'Spring Boot', value: 'springb' },
                                    { key: 'nodejs', text: 'NodeJs', value: 'nodejs' },
                                    { key: 'wf', text: 'Wildfly', value: 'wildfly' },
                                ]} placeholder="Select Runtime" required />
                                <Form.Select label="Version" options={[
                                    { key: 'com', text: 'Community', value: 'community' },
                                    { key: 'rh', text: 'Red Hat', value: 'redhat' },
                                ]} placeholder="Select Version" required />
                            </Form>
                        </Step.Content>
                    </Step>
                </DOMRef>
            ),
            props.isLast && this.buttonStep(empty, this.dbStep)
        ];
    }

    dbStep = (props) => {
        const dbCreateLayout = {
            nodes: {
                db1: {type: 'service', name: 'Database: PostgreSQL', services: ['dummy'], suggested: true},
                cm2: {type: 'configmap', name: 'Database Auth', suggested: true},
                v1: {type: 'storage', name: 'Database Storage', suggested: true},
            },
            edges: {
                l3: {from: 'db1', to: 'cm2', suggested: true},
                l4: {from: 'db1', to: 'v1', suggested: true},
                l5: {from: 's2', to: 'db1', suggested: true},
            }
        };
        const dbExistingLayout = {
            nodes: {
                db1: {type: 'extdb', suggested: true},
            },
            edges: {
                l5: {from: 's2', to: 'db1', suggested: true},
            }
        };
        return (
            <DOMRef domRef={this.scrollIntoView}>
                <Step>
                    <Step.Content>
                        <Step.Title>Database</Step.Title>
                        <Step.Description>What database do you want to use?</Step.Description>
                        <Form>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Create local database'
                                    name='database'
                                    value='create'
                                    onClick={() => this.pushStep(dbCreateLayout, this.dbCreateStep)}
                                    checked={this.state.forms.database === 'create'}
                                    onChange={this.fieldHandler}
                                    disabled={this.state.forms.database}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Connect to local database'
                                    name='database'
                                    value='local'
                                    onClick={() => this.pushStep(dbExistingLayout, this.dbLocalStep)}
                                    checked={this.state.forms.database === 'local'}
                                    onChange={this.fieldHandler}
                                    disabled={this.state.forms.database}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Connect to external database'
                                    name='database'
                                    value='other'
                                    onClick={() => this.pushStep(dbExistingLayout, this.dbExternalStep)}
                                    checked={this.state.forms.database === 'other'}
                                    onChange={this.fieldHandler}
                                    disabled={this.state.forms.database}
                                />
                            </Form.Field>
                        </Form>
                    </Step.Content>
                </Step>
            </DOMRef>
        )
    }

    dbCreateStep = (props) => {
        return [
            (
                <DOMRef domRef={this.scrollIntoView}>
                    <Step>
                        <Step.Content>
                            <Step.Title>Create Local Database</Step.Title>
                            <Step.Description>What database do you want to use?</Step.Description>
                            <Form>
                                <Dropdown placeholder='Select Database' label="Type" fluid selection
                                          options={[
                                              { key: 'psql', text: 'PostgreSQL', value: 'postgresql', image: 'https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg' },
                                              { key: 'mysql', text: 'MySQL', value: 'mysql', image: 'https://www.mysql.com/common/logos/logo-mysql-170x115.png' },
                                          ]} required />
                                <Form.Input label="Name" placeholder="Name" required />
                                <Form.Button label="Schema">Import...</Form.Button>
                                <Dropdown placeholder='Select Table' label="Table" fluid selection
                                          options={[
                                              { key: 'import', text: 'Import Schema', value: 'import' },
                                              { key: 't1', text: 'sunny-days', value: 't1' },
                                              { key: 't2', text: 'twinkly-months', value: 't2' },
                                              { key: 't3', text: 'stars-sun-props', value: 't3' },
                                          ]} required />
                                <Form.Input label="User" placeholder="User" required />
                                <Form.Input label="Password" type="password" required />
                            </Form>
                        </Step.Content>
                    </Step>
                </DOMRef>
            ),
            props.isLast && this.buttonStep(restLayout, this.restStep)
        ];
    }

    dbLocalStep = (props) => {
        return [
            (
                <DOMRef domRef={this.scrollIntoView}>
                    <Step>
                        <Step.Content>
                            <Step.Title>Connect To Existing Database</Step.Title>
                            <Step.Description>Connect to the database you want to use</Step.Description>
                            <Form>
                                <Form.Button label="Schema">Authenticate...</Form.Button>
                                <Dropdown placeholder='Select Cluster' label="Cluster" fluid selection
                                          options={[
                                              { key: 'prouse1', text: 'Pro US East 1', value: 'pro-us-east-1' },
                                              { key: 'prousw1', text: 'Pro US West 1', value: 'pro-us-west-1' },
                                              { key: 'proeuw1', text: 'Pro EU West 1', value: 'pro-eu-west-1' },
                                              { key: 'proapse2', text: 'Pro AP Southeast 2', value: 'pro-ap-southeast-2' },
                                          ]} required />
                                <Dropdown placeholder='Select Database' label="Database" fluid selection
                                          options={[
                                              { key: 'db1', text: 'twinkly-sunshine', value: 'db1' },
                                              { key: 'db2', text: 'catty-kitten-prod', value: 'db2' },
                                              { key: 'db3', text: 'theatrial-insights', value: 'db3' },
                                          ]} required />
                                <Dropdown placeholder='Select Table' label="Table" fluid selection
                                          options={[
                                              { key: 'import', text: 'Import Schema', value: 'import' },
                                              { key: 't1', text: 'sunny-days', value: 't1' },
                                              { key: 't2', text: 'twinkly-months', value: 't2' },
                                              { key: 't3', text: 'stars-sun-props', value: 't3' },
                                          ]} required />
                            </Form>
                        </Step.Content>
                    </Step>
                </DOMRef>
            ),
            props.isLast && this.buttonStep(restLayout, this.restStep)
        ];
    }

    dbExternalStep = (props) => {
        return [
            (
                <DOMRef domRef={this.scrollIntoView}>
                    <Step>
                        <Step.Content>
                            <Step.Title>Connect To External Database</Step.Title>
                            <Step.Description>Connect to the database you want to use</Step.Description>
                            <Form>
                                <Form.Input label="Connection" placeholder="Connection String" required />
                                <Form.Input label="User" placeholder="User" required />
                                <Form.Input label="Password" type="password" required />
                                <Dropdown placeholder='Select Table' label="Table" fluid selection
                                          options={[
                                              { key: 'import', text: 'Import Schema', value: 'import' },
                                              { key: 't1', text: 'sunny-days', value: 't1' },
                                              { key: 't2', text: 'twinkly-months', value: 't2' },
                                              { key: 't3', text: 'stars-sun-props', value: 't3' },
                                          ]} required />
                            </Form>
                        </Step.Content>
                    </Step>
                </DOMRef>
            ),
            props.isLast && this.buttonStep(restLayout, this.restStep)
        ];
    }

    restStep = (props) => {
        return [
                (
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
                                ]} placeholder="Select Runtime" required />
                                <Form.Select label="Version" options={[
                                    { key: 'com', text: 'Community', value: 'community' },
                                    { key: 'rh', text: 'Red Hat', value: 'redhat' },
                                ]} placeholder="Select Version" required />
                            </Form>
                        </Step.Content>
                    </Step>
                </DOMRef>
            ),
            props.isLast && this.buttonStep(empty, this.generateButtonStep)
        ];
    }

    generateButtonStep = (props) => (
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
                        <Form.Button primary icon="cloud upload" labelPosition="right" content="Deploy" onClick={() => this.pushStep(empty, this.infoStep, false)} />
                    </Form>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    infoStep = (props) => (
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
                                <a onClick={() => this.setState({layout: empty, history: [], steps: [ this.startStep ]})}>Create new application</a>
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
        let showSteps = this.state.history.length;
        return (
            <div className={classNames("t3-design-withsteps")}>
                <div className={classNames("left-panel")}>
                    <Step.Group fluid vertical>
                        { this.state.steps.map((f, i, a) => f({ isLast: i == (a.length - 1) })) }
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
