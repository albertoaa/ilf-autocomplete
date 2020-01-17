import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import '../../sass/autocomplete.scss';

class Autocomplete extends Component {
  static PropTypes = {
    states: PropTypes.instanceOf(Array),
    searchState: PropTypes.instanceOf(Function)
  };

  static defaultProps = {
    states: []
  };

  constructor(props) {
    super(props);
    this.state = {
      activeState: 0,
      showStates: false,
      userInput: ''
    };
  }

  onChange = ev => {
    this.props.searchState(ev.currentTarget.value);

    this.setState({
      activeState: 0,
      showStates: true,
      userInput: ev.currentTarget.value
    });
  };

  onClick = ev => {
    this.setState({
      activeState: 0,
      filteredStates: [],
      showStates: false,
      userInput: ev.currentTarget.innerText
    });
  };

  onKeyDown = ev => {
    const { activeState, filteredStates } = this.state;

    // Managing Enter key
    if (ev.keyCode === 13) {
      this.setState({
        activeState: 0,
        showStates: false,
        userInput: filteredStates[activeState]
      });
    }
    // Managing up arrow key
    else if (ev.keyCode === 38) {
      if (activeState === 0) {
        return;
      }
      this.setState({ activeState: activeState - 1 });
    } else if (ev.keyCode === 40) {
      if (activeState - 1 === filteredStates.length) {
        return;
      }
      this.setState({ activeState: activeState + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeState, showStates, userInput }
    } = this;

    let statesListComponent;

    if (showStates && userInput.length >= 2) {
      if (this.props.states.length) {
        statesListComponent = (
          <ul className="states">
            {this.props.states.map((state, index) => {
              let className;
              if (index === activeState) {
                className = 'state-active';
              }

              return (
                <li className={className} key={state} onClick={onClick}>
                  {state}
                </li>
              );
            })}
          </ul>
        );
      } else {
        statesListComponent = (
          <div className="no-states">
            <em>Sorry, no states match that criteria</em>
          </div>
        );
      }
    }

    return (
      <div>
        <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={userInput} />
        {statesListComponent}
      </div>
    );
  }
}

export default Autocomplete;
