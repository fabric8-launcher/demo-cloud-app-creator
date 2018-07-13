import React, { Component } from 'react';
import { Step, Button } from 'semantic-ui-react';
import Picture from '../../components/Picture';

export default class Part extends Component {
    render() {
        return (
            <Step link>
                <Picture value="react"/>
                <Step.Content>
                    <Step.Title>App</Step.Title>
                    <Step.Description>Description</Step.Description>
                    <Step.Content>
                        <Button circular size="tiny" icon="plus"/>
                    </Step.Content>
                </Step.Content>
            </Step>            
        );
    }
}