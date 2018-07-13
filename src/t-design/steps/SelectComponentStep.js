import React, { Component } from 'react';
import Step from '../components/Step';
import SelectBox from '../../components/SelectBox';

class SelectComponentStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponents: false
    };
    this.clickOnBox = this.clickOnBox.bind(this);
    this.showComponents = this.showComponents.bind(this);
  }

  clickOnBox(event) {
    this.setState({ showComponents: false });
    this.props.action(event);
  }

  showComponents() {
    this.setState({ showComponents: true });
  }

  render() {
    const { title, icon } = this.props;
    return (
      <Step.Item
        title={title}
        description="Add any other component from the full list of components available"
        icon={icon}
        extra={!this.state.showComponents && (<a style={{float: 'right'}} onClick={this.showComponents}>Click here to show components</a>)}
      >
        {this.state.showComponents && (
          <SelectBox.List>
            <SelectBox.Item title="MicroService" description="A simple MicroService" tags={['backend', 'microservice']} picture="/images/microservices.png" onClick={this.clickOnBox}/>
            <SelectBox.Item title="CRUD" description="A simple CRUD App" tags={['backend', 'frontend']} picture="database" onClick={this.clickOnBox}/>
          </SelectBox.List>
        )}
      </Step.Item>
    );
  }
}

SelectComponentStep.defaultProps = {
  id: 'bottom-select-component',
  title: 'Do you want another component?',
  icon: 'plus square outline',
  action: () => {}
};

export default SelectComponentStep;