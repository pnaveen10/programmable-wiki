import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import EditMode from './EditMode';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Wiki</h2>
        </div>
        <EditMode/>
      </div>
    );
  }
}

export default App;
