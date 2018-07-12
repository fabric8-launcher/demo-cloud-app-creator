import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
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
                    Add Storage
                    <Button icon="plus" circular/>
                </Card.Content>
                <Card.Content extra>
                    Add Config map
                    <Button icon="plus" circular/>
                </Card.Content>
                <Card.Content extra>
                    Add Environment Variable 
                    <Button icon="plus" circular/>
                </Card.Content>
          </Card>            
        );
    }
}