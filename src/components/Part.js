import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import Picture from './Picture';

export default class Part extends Component {
    render() {
        return (
            <Card as="a" className="template-item">
                <Picture value="react"/>
                <Card.Content>
                    <Card.Header>React App</Card.Header>
                    <Card.Description>Description</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button icon labelPosition="left">
                        <Icon name='plus' />
                        Add Storage
                    </Button>
                </Card.Content>
                <Card.Content extra>
                    <Button icon labelPosition="left">
                        <Icon name='plus' />
                        Add Config Map
                    </Button>
                </Card.Content>
          </Card>            
        );
    }
}