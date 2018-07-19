import React, { Component } from 'react';
import { Button, Container, Icon, Modal, Step, Tab } from 'semantic-ui-react';
import SelectBox from '../../components/SelectBox';
import Part from './Part';
import shortid from 'shortid';

export default class Lane extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: props.title,
          modalOpen: false,          
          parts: [],
          panes : [
            { menuItem: 'Applications', render: () => 
                <Tab.Pane>                                        
                    <SelectBox.List>
                        <SelectBox.Item title="Java" description="A Java application" tags={['backend', 'frontend']} picture="coffee" onClick={i=> this.addPart({
                            id: shortid.generate(),
                            icon: 'coffee',
                            title: 'Java',
                            description: 'A Java Application'
                         })}/>
                        <SelectBox.Item title="JavaScript (Node.js)" description="An application written in JavaScript" tags={['backend', 'frontend']} picture="node" onClick={i=> this.addPart({
                            id: shortid.generate(),
                            icon: 'node',
                            title: 'JavaScript (Node.js)',
                            description: 'A JS App'
                         })}/>
                    </SelectBox.List>
                </Tab.Pane> },
            { menuItem: 'Services', render: () => 
                <Tab.Pane>                                        
                    <SelectBox.List>
                        <SelectBox.Item title="Messaging" description="Active MQ" tags={['messaging', 'amq', 'backend']} picture="envelope" onClick={i=> this.addPart({
                            id: shortid.generate(),
                            icon: 'envelope',
                            title: 'Messaging',
                            description: 'ActiveMQ'
                         })}/>
                        <SelectBox.Item title="Postgres DB" description="Database" tags={['database']} picture="database" onClick={i=> this.addPart({
                            id: shortid.generate(),
                            icon: 'database',
                            title: 'Postgres DB',
                            description: 'Database'
                         })}/>
                    </SelectBox.List>
                </Tab.Pane> },
            { menuItem: 'Resources', render: () => 
                <Tab.Pane>                                        
                    <SelectBox.List>
                        <SelectBox.Item title="ConfigMap" description="Config Map is a configuration map" tags={['configuration']} picture="table" onClick={i=> this.addPart({
                            id: shortid.generate(),
                            icon: 'table',
                            title: 'Config Map',
                            description: 'A configuration map'
                         })}/>
                        <SelectBox.Item title="Secret" description="For your passwords" tags={['secret']} picture="lock" onClick={i=> this.addPart({
                            id: shortid.generate(),
                            icon: 'lock',
                            title: 'Secret',
                            description: 'For your passwordsz'
                         })}/>
                    </SelectBox.List>
                </Tab.Pane> }

          ]
        };

    }

    handleModalOpen = () => this.setState({ modalOpen: true })
    handleModalClose = () => this.setState({ modalOpen: false })
  
    addPart = (part) => {
        this.setState(prevState => ({
            parts: [...prevState.parts, part]
        }));
        this.handleModalClose();
    }

    render() {
        return (
            <div className="part">
                <fieldset>
                    <legend>{this.state.title}</legend>
                    <Container>
                        <Step.Group>
                            {this.state.parts.map((item, index) => {return (
                                <Part key={item.id} id={item.id} icon={item.icon} title={item.title} description={item.description} onClick={this.props.onComponentSelected}/>)})}
                        </Step.Group>
                        <Modal closeIcon
                                open={this.state.modalOpen}
                                onClose={this.handleModalClose}
                                trigger={
                                    <Button icon circular labelPosition="left" animated='fade' onClick={this.handleModalOpen}>
                                        <Button.Content hidden>Add</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='plus' />
                                        </Button.Content>
                                    </Button>
                                }>
                            <Modal.Header>Select a Service</Modal.Header>
                            <Modal.Content>
                                <Tab panes={this.state.panes}/>
                           </Modal.Content>
                        </Modal>
                    </Container>
                </fieldset>
            </div>
        );
    }

}
 