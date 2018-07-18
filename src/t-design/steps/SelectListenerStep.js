import React, { Component } from 'react';
import Step from '../components/Step';
import SelectBox from '../../components/SelectBox';
import PlainListenerStep from './PlainListenerStep';
import ToDatabaseListenerStep from './ToDatabaseListenerStep';
import SelectDatabaseStep from './SelectDatabaseStep';
import PropTypes from "prop-types";

class SelectListenerStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponents: false
    };

    this.items = [
      { id:1, title:"Listener", description:"A plain listener", step: (key) => [
              <PlainListenerStep key={key} id={key} />
          ]},
      { id:2, title:"To Database", description:"A listener that writes the messages it receives to a database", step: (key) => [
              <ToDatabaseListenerStep key={key+"_1"} id={key+"_1"} />,
              <SelectDatabaseStep key={key+"_2"} id={key+"_2"} replaceStepWithSteps={this.props.replaceStepWithSteps} />
          ]},
      { id:3, title:"Other Sink", description:"Some other listener", step: (key) => [
              <PlainListenerStep key={key} id={key} />
          ]},
    ];
  }

  onSelect = (item) => {
    this.setState({ showComponents: false });
    this.props.replaceStepWithSteps(this, item.step(this.props.id));
  }

  showComponents = () => {
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
          {
              this.items.map((item, index) => (
                  <SelectBox.Item key={index} {...item} onClick={() => this.onSelect(item)}/>
              ))
          }
          </SelectBox.List>
        )}
      </Step.Item>
    );
  }
}

SelectListenerStep.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    replaceStepWithSteps: PropTypes.func,
};

SelectListenerStep.defaultProps = {
  title: 'Add a listener?',
  icon: 'envelope outline',
  replaceStepWithSteps: () => {},
};

export default SelectListenerStep;