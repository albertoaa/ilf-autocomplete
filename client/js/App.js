'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import app from '../sass/app';
import Autocomplete from './components/Autocomplete';

export default class Application extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Autocomplete states={['Alabama', 'Carolina', 'Florida', 'Washington DC']} />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
