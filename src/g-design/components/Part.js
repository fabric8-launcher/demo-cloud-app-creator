import React, { Component } from 'react';
import { Button, Icon, Step } from 'semantic-ui-react';

export default class Part extends Component {

    render() {
        return (
            <Step link onClick={(e) => this.props.onClick(e, this.props)}>
                <Icon name={this.props.icon} />
                <Step.Content>
                    <Step.Title>{this.props.title}</Step.Title>
                    <Step.Description>{this.props.description}</Step.Description>
                </Step.Content>
                <Step.Content>
                    <div className='ui two buttons'>
                        <Button icon="caret up" title="Create a Route" onClick={this.props.onRouteCreate} />
                    </div>
                </Step.Content>
            </Step>
        );
    }
}