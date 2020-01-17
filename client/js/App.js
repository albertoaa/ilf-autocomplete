'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

import app from '../sass/app';
import Autocomplete from './components/Autocomplete';

const API_URL = 'http://localhost:3000/api';

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: []
    };
  }

  searchState = searchTerm => {
    let states = [];
    axios
      .get(`${API_URL}/states?term=${searchTerm}`)
      .then(re => {
        re.data.data.map(state => {
          states.push(state.name);
        });
        this.setState({ states });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Autocomplete states={this.state.states} searchState={this.searchState} />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
