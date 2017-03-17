import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class ViewMode extends React.Component {

    constructor(props) {
        super(props);

        this.testAPI = this.testAPI.bind(this);
        // this.updateState = this.updateState.bind(this);
    }
    testAPI() {
        var root = 'https://jsonplaceholder.typicode.com';

        $.ajax({
          url: root + '/posts/1',
          method: 'GET'
        }).then(function(data) {
          console.log(data);
        });
    }
    // updateState(e) {
    //     var fieldName = e.target.name;
    //     var value = e.target.value;
    //     var newLocalState = this.state.editContent;
    //
    //     switch (fieldName) {
    //         case "title":
    //             newLocalState.title = value;
    //             break;
    //         case "description":
    //             newLocalState.description = value;
    //             break;
    //         case "type":
    //             newLocalState.type = value;
    //             break;
    //     }
    //
    //     this.setState({editContent : newLocalState});
    // }
    render() {
      return (
        <div className = "medium-6">
            <label> Title </label>
            <div>
                Code goes here
            </div>
            <button className="btn" type="button" onClick={this.props.toggleMode}> Edit </button>
            <button className="btn" type="button" onClick={this.testAPI}> Add page </button>
        </div>
      );
    }
}
