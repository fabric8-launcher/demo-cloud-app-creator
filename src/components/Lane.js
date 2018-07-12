import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class Lane extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: props.title
        };
      }
    
    render() {
        return (
            <fieldset>
                <legend>{this.state.title}</legend>
                <Button circular icon='plus' />
            </fieldset>
        );
    }

}
 