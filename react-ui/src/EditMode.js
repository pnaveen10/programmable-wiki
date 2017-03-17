import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class EditMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editContent: {
                title: '',
                description: '',
                type: 'text'
            }
        };
        this.updateState = this.updateState.bind(this);
    }
    updateState(e) {
        var fieldName = e.target.name;
        var value = e.target.value;
        var newLocalState = this.state.editContent;

        switch (fieldName) {
            case "title":
                newLocalState.title = value;
                break;
            case "description":
                newLocalState.description = value;
                break;
            case "type":
                newLocalState.type = value;
                break;
            case "code":
                newLocalState.code = value;
                break;
        }

        this.setState({editContent : newLocalState});
    }
    render() {
      return (
        <div>
            <div className="form-group">
                <label> Title </label>
                <input type="text" name="title" value={this.state.editContent.title} onChange={this.updateState}/>
            </div>
            <div className="form-group">
                <label> Description </label>
                <input type="text" name="description" value={this.state.editContent.description} onChange={this.updateState}/>
            </div>
            <div className="form-group">
                <label> Type </label>
                <select name="type" value={this.state.editContent.type} onChange={this.updateState}>
                    <option value="text">Plain text</option>
                </select>
            </div>
            <div className="form-group">
                <label>Code</label>
                <textarea name="code" rows="10" cols="100" value={this.state.editContent.code} onChange={this.updateState}></textarea>
            </div>
            <div className="form-group">
                <button className="btn" type="button" onClick={this.props.toggleMode}> Go back </button>
            </div>
        </div>
      );
    }
}
