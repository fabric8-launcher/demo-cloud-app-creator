import classNames from 'classnames';
import React from 'react';
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

const step0 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ', services: ['dummy'], suggested: true},
        cm1: {type: 'configmap', name: 'Message Broker Auth', suggested: true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1', suggested: true},
    }
};

const step1 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ', services: ['dummy']},
        cm1: {type: 'configmap', name: 'Message Broker Auth'},
        s2: {type: 'service', name: 'Listener: to Database', hasBuildConfig: true, suggested: true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1'},
        l2: {from: 's2', to: 's1', suggested: true},
    }
};

const step2 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ', services: ['dummy']},
        cm1: {type: 'configmap', name: 'Message Broker Auth'},
        s2: {type: 'service', name: 'Listener: to Database', hasBuildConfig: true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1'},
        l2: {from: 's2', to: 's1'},
    }
};

const step3 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ', services: ['dummy']},
        cm1: {type: 'configmap', name: 'Message Broker Auth'},
        s2: {type: 'service', name: 'Listener: to Database', hasBuildConfig: true},
        s3: {type: 'service', name: 'Database: PostgreSQL', services: ['dummy'], suggested: true},
        cm2: {type: 'configmap', name: 'Database Auth', suggested: true},
        v1: {type: 'storage', name: 'Database Storage', suggested: true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1'},
        l2: {from: 's2', to: 's1'},
        l3: {from: 's3', to: 'cm2', suggested: true},
        l4: {from: 's3', to: 'v1', suggested: true},
        l5: {from: 's2', to: 's3', suggested: true},
    }
};

const step4 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ', services: ['dummy']},
        cm1: {type: 'configmap', name: 'Message Broker Auth'},
        s2: {type: 'service', name: 'Listener: to Database', hasBuildConfig: true},
        s3: {type: 'service', name: 'Database: PostgreSQL', services: ['dummy']},
        cm2: {type: 'configmap', name: 'Database Auth'},
        v1: {type: 'storage', name: 'Database Storage'},
        s4: {type: 'service', name: 'REST API', services: ['dummy'], hasBuildConfig: true, suggested:true},
        r1: {type: 'route', suggested:true},
    },
    edges: {
        l1: {from: 's1', to: 'cm1'},
        l2: {from: 's2', to: 's1'},
        l3: {from: 's3', to: 'cm2'},
        l4: {from: 's3', to: 'v1'},
        l5: {from: 's2', to: 's3'},
        l6: {from: 's4', to: 'r1', suggested:true},
        l7: {from: 's4', to: 's3', suggested:true},
    }
};

const step5 = {
    nodes: {
        s1: {type: 'service', name: 'Message Broker: AMQ', services: ['dummy']},
        cm1: {type: 'configmap', name: 'Message Broker Auth'},
        s2: {type: 'service', name: 'Listener: to Database', hasBuildConfig: true},
        s3: {type: 'service', name: 'Database: PostgreSQL', services: ['dummy']},
        cm2: {type: 'configmap', name: 'Database Auth'},
        v1: {type: 'storage', name: 'Database Storage'},
        s4: {type: 'service', name: 'REST API', services: ['dummy'], hasBuildConfig: true},
        r1: {type: 'route'},
    },
    edges: {
        l1: {from: 's1', to: 'cm1'},
        l2: {from: 's2', to: 's1'},
        l3: {from: 's3', to: 'cm2'},
        l4: {from: 's3', to: 'v1'},
        l5: {from: 's2', to: 's3'},
        l6: {from: 's4', to: 'r1'},
        l7: {from: 's4', to: 's3'},
    }
};

class DiagramWithTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: null,
            showSteps: 0,
            layout: {
                nodes: {
                },
                edges: {
                }
            }
        };
    }

    scrollIntoView = (props, node) => node && node.scrollIntoView();

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

    amqStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step onClick={() => this.setState({layout: step1, showSteps: 2})}>
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

    dbStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step onClick={() => this.setState({layout: step3, showSteps: 4})}>
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

    dbLocalStep = () => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step>
                <Step.Content>
                    <Step.Title>Create Local Database</Step.Title>
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
        </DOMRef>
    )

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
                                <a onClick={() => this.setState({layout: empty, showSteps: 0})}>Create new application</a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    buttonStep = (layout, nextStep, title="OK") => (
        <DOMRef domRef={this.scrollIntoView}>
            <Step onClick={() => this.setState({layout: layout, showSteps: nextStep})}>
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
                        <Form.Button primary icon="cloud upload" labelPosition="right" content="Deploy" onClick={() => this.setState({showSteps: 7})} />
                    </Form>
                </Step.Content>
            </Step>
        </DOMRef>
    )

    onSelectItem = (id, item) => {
        this.setState({selectedItemId: id});
    }

    render() {
        return (
            <div className={classNames("t3-design-withsteps")}>
                <div className={classNames("left-panel")}>
                    <Step.Group fluid vertical>
                        { this.state.showSteps < 7 && this.startStep() }
                        { this.state.showSteps == 0 && this.buttonStep(step0, 1, "Start") }
                        { this.state.showSteps >= 1 && this.state.showSteps < 7 && this.amqStep() }
                        { this.state.showSteps >= 2 && this.state.showSteps < 7 && this.listenerStep() }
                        { this.state.showSteps == 2 && this.buttonStep(step2, 3) }
                        { this.state.showSteps >= 3 && this.state.showSteps < 7 && this.dbStep() }
                        { this.state.showSteps >= 4 && this.state.showSteps < 7 && this.dbCreateStep() }
                        { this.state.showSteps == 4 && this.buttonStep(step4, 5) }
                        { this.state.showSteps >= 5 && this.state.showSteps < 7 && this.restStep() }
                        { this.state.showSteps == 5 && this.buttonStep(step5, 6) }
                        { this.state.showSteps >= 6 && this.state.showSteps < 7 && this.generateButtonStep() }
                        { this.state.showSteps >= 7 && this.infoStep() }
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
