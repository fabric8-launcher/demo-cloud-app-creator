import React, { Component } from 'react';
import { Button, Container, Icon, Modal, Step, Tab } from 'semantic-ui-react';
import SelectBox from '../../components/SelectBox';
import Part from './Part';

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
                    <SelectBox.List onClick={i => this.addPart(i)} fluid>
                        <SelectBox.Item title="Java" description="A Java application" tags={['backend', 'frontend']} picture="coffee" />
                        <SelectBox.Item title="JavaScript (Node.js)" description="An application written in JavaScript" tags={['backend', 'frontend']} picture="node" />
                    </SelectBox.List>
                </Tab.Pane> },
            { menuItem: 'Services', render: () => 
                <Tab.Pane>                                        
                    <SelectBox.List onClick={i => this.addPart(i)} fluid>
                        <SelectBox.Item title="Messaging" description="Active MQ" tags={['messaging', 'amq', 'backend']} picture="envelope"/>
                        <SelectBox.Item title="Postgres DB" description="Database" tags={['database']} picture="database"/>
                    </SelectBox.List>
                </Tab.Pane> },
            { menuItem: 'Resources', render: () => 
                <Tab.Pane>                                        
                    <SelectBox.List onClick={i => this.addPart(i)} fluid>
                        <SelectBox.Item title="ConfigMap" description="Config Map is a configuration map" tags={['configuration']} picture="table"/>
                        <SelectBox.Item title="Secret" description="For your passwords" tags={['secret']} picture="lock"/>
                    </SelectBox.List>
                </Tab.Pane> }

          ]
        };

    }

    handleModalOpen = () => this.setState({ modalOpen: true })
    handleModalClose = () => this.setState({ modalOpen: false })
  
    addPart(i) {
        this.setState(prevState => ({
            parts: [...prevState.parts, prevState.parts.length]
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
                                <Part name="{item}" key={index}/>
                            )})}
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
 