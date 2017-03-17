import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class ViewMode extends React.Component {

    constructor(props) {
        super(props);

        // this.updateState = this.updateState.bind(this);
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
            <button className="btn" type="button"> Add page </button>
        </div>
      );
    }
}
