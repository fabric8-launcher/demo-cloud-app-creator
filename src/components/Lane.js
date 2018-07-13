import React, { Component } from 'react';
import { Button, Container, Icon, List, Modal } from 'semantic-ui-react';
import Part from './Part';
import SelectBox from './SelectBox';

export default class Lane extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: props.title,
          modalOpen: false,          
          parts: []
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
                        <List horizontal>
                            {this.state.parts.map((item, index) => {return (
                            <List.Item key={item}>
                                <Part name="{item}"/>
                            </List.Item>
                            )})}
                        </List>
                        <Modal closeIcon
                                open={this.state.modalOpen}
                                onClose={this.handleModalClose}
                                trigger={
                                    <Button icon circular labelPosition="left" animated='fade' onClick={this.handleModalOpen}>
                                        <Button.Content hidden>Add Service</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='plus' />
                                        </Button.Content>
                                    </Button>
                                }>
                            <Modal.Header>Select a Service</Modal.Header>
                            <Modal.Content>
                                    <SelectBox.List onClick={i => this.addPart(i)} fluid>
                                        <SelectBox.Item title="Java" description="A Java application" tags={['backend', 'frontend']} picture="coffee" />
                                        <SelectBox.Item title="JavaScript (Node.js)" description="An application written in JavaScript" tags={['backend', 'frontend']} picture="node" />
                                        <SelectBox.Item title="Messaging" description="Active MQ" tags={['messaging', 'amq', 'backend']} picture="envelope"/>
                                        <SelectBox.Item title="Postgres DB" description="Database" tags={['database']} picture="database"/>
                                    </SelectBox.List>                            
                            </Modal.Content>
                        </Modal>                        
                    </Container>
                </fieldset>
            </div>
        );
    }

}
 