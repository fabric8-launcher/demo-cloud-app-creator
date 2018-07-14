import React, { Component } from 'react';
import Step from '../components/Step';
import SelectBox from '../../components/SelectBox';
import EmptyDatabaseStep from './EmptyDatabaseStep';
import PropTypes from "prop-types";

const items = [
    { id:1, title:"Empty Database", description:"Create a new empty database", step: (key) => [
            <EmptyDatabaseStep key={key} id={key} />
        ]},
    { id:2, title:"Messages Database", description:"Pre-configured database for messages", step: (key) => [
            <EmptyDatabaseStep key={key} id={key} />
        ]},
    { id:3, title:"External Database", description:"Connect to an external database", step: (key) => [
            <EmptyDatabaseStep key={key} id={key} />
        ]},
];

class SelectDatabaseStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponents: false
    };
    this.onSelect = this.onSelect.bind(this);
    this.showComponents = this.showComponents.bind(this);
  }

  onSelect(item) {
    this.setState({ showComponents: false });
    this.props.replaceStepWithSteps(this, item.step(this.props.id));
  }

  showComponents() {
    this.setState({ showComponents: true });
  }

  render() {
    const { title, icon } = this.props;
    return (
      <Step.Item
        title={title}
        description="Create a database or connect to an existing one"
        icon={icon}
        extra={!this.state.showComponents && (<a style={{float: 'right'}} onClick={this.showComponents}>Click here to show databases</a>)}
      >
        {this.state.showComponents && (
          <SelectBox.List>
          {
              items.map((item, index) => (
                  <SelectBox.Item key={index} {...item} onClick={() => this.onSelect(item)}/>
              ))
          }
          </SelectBox.List>
        )}
      </Step.Item>
    );
  }
}

SelectDatabaseStep.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

SelectDatabaseStep.defaultProps = {
  title: 'Select database',
  icon: 'database',
  action: () => {}
};

export default SelectDatabaseStep;