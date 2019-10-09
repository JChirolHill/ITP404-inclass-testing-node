import React from 'react';
import './App.css';
import RemainingCharacters from './RemainingCharacters';
import InlineEdit from './InlineEdit';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: 'Untitled Document'
    };
  }
  handleTitleUpdate = (newTitle) => {
    this.setState({ title: newTitle });
  }
  handleChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }
  render() {
    return (
      <div>
        <InlineEdit value={this.state.title} onEnter={this.handleTitleUpdate} />
        <br />
        <InlineEdit value={this.state.title} onEnter={this.handleTitleUpdate}>
          {
            (editMode, currentValue, handleKeyUp, handleInputChange, enableEditMode) => {
              if (editMode) {
                return (
                  <input
                    value={currentValue}
                    onKeyUp={handleKeyUp}
                    onChange={handleInputChange} />
                );
              }

              return (
                <span onClick={enableEditMode}>
                  {this.state.title}
                </span>
              );
            }
          }
        </InlineEdit>


        <br />
        <input value={this.state.name} onChange={this.handleChange} />
        <br />
        <div>
          <RemainingCharacters max={10} text={this.state.name} />
        </div>
        <br />
        <RemainingCharacters max={10} text={this.state.name}>
          {
            (remainingCharacters) => {
              return (
                <p className={remainingCharacters < 0 ? "danger" : undefined}>
                  {remainingCharacters}
                </p>
              );
            }
          }
        </RemainingCharacters>
      </div>
    );
  }
}
