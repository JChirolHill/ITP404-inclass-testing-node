import React from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default class InlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.value,
      editMode: false
    };
  }
  enableEditMode = () => {
    this.setState({
      editMode: true
    });
  }
  handleChange = (event) => {
    this.setState({
      currentValue: event.target.value
    });
  }
  handleKeyUp = (event) => {
    const { keyCode } = event;
    const { currentValue } = this.state;

    if (keyCode === ENTER_KEY || keyCode === ESCAPE_KEY) {
      this.setState({ editMode: false });
    }

    if (keyCode === ENTER_KEY) {
      this.props.onEnter(currentValue);
    } else if (keyCode === ESCAPE_KEY) {
      this.setState({
        currentValue: this.props.value
      });
    }
  }
  render() {
    if (typeof this.props.children === 'function') {
      return this.props.children(
        this.state.editMode,
        this.state.currentValue,
        this.handleKeyUp,
        this.handleChange,
        this.enableEditMode
      );
    }

    if (this.state.editMode) {
      return (
        <input
          data-testid="inline-edit-input"
          value={this.state.currentValue}
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange} />
      );
    }

    // use a data-testid attr to be able to access this value in component
    return (
      <span data-testid="inline-edit-text" onClick={this.enableEditMode}>
        {this.props.value}
      </span>
    );
  }
}

InlineEdit.propTypes = {
  value: PropTypes.string.isRequired,
  onEnter: PropTypes.func.isRequired
};
