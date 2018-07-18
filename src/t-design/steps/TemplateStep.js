import React from 'react';
import SelectBox from '../../components/SelectBox';
import Step from '../components/Step';
import PropTypes from "prop-types";

class TemplateStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: {}
        }
    }

    onSelect = (item) => {
        this.setState({ selected: item });
        this.props.action(item);
    }

    render() {
        return (
            <Step.Item
                title={this.props.title}
                description="You can choose one of those predefined templates to create you app, you will still be able to customize it once selected."
                icon={this.props.icon}
            >
                <SelectBox.List>
                {
                    this.props.items.map((item, index) => (
                        <SelectBox.Item key={index} {...item} selected={item.id===this.state.selected.id} onClick={() => this.onSelect(item)}/>
                    ))
                }
                </SelectBox.List>
            </Step.Item>
        );
    }
}

TemplateStep.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    items: PropTypes.array,
};

TemplateStep.defaultProps = {
    title: 'Select a template',
    icon: 'wpforms',
    items: [],
    action: (item) => {},
};

export default TemplateStep;