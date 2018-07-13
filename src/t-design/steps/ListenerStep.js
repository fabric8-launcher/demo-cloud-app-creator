import React, { Component } from 'react';
import Step from '../components/Step';
import SelectBox from '../../components/SelectBox';

class ListenerStep extends Component {
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
        description="Message listeners are the application pieces which receive a message and may take some action"
        icon={icon}
        extra={!this.state.showComponents && (<a style={{float: 'right'}} onClick={this.showComponents}>Click here to show listeners</a>)}
      >
        {this.state.showComponents && (
          <SelectBox.List>
            <SelectBox.Item title="Listener" description="A plain listener" onClick={this.clickOnBox}/>
            <SelectBox.Item title="To Database" description="A listener that writes the messages it receives to a database" onClick={this.clickOnBox}/>
            <SelectBox.Item title="Other Sink" description="Some other listener" onClick={this.clickOnBox}/>
          </SelectBox.List>
        )}
      </Step.Item>
    );
  }
}

ListenerStep.defaultProps = {
  id: 'select-listener',
  title: 'Do you want to add a listener?',
  icon: 'envelope outline',
  action: () => {}
};

export default ListenerStep;