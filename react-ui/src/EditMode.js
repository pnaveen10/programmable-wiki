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
			<form className="form-horizontal">
				<div className="form-group">
					<label className="control-label col-sm-2"> Title </label>
					<div className="col-sm-10">
						<input className="form-control" placeholder="Name of the page" type="text" name="title" value={this.state.editContent.title} onChange={this.updateState}/>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2"> Description </label>
					<div className="col-sm-10">
						<input className="form-control" placeholder="Description about page" type="text" name="description" value={this.state.editContent.description} onChange={this.updateState}/>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2"> Type </label>
					<div className="col-sm-10">
						<select className="form-control"  name="type" value={this.state.editContent.type} onChange={this.updateState}>
							<option value="text">Plain text</option>
						</select>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2">Code</label>
					<div className="col-sm-10">
						<textarea className="form-control"  name="code" rows="10" cols="100" value={this.state.editContent.code} onChange={this.updateState}></textarea>
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-10">
						<button className="btn btn-default" type="button" onClick={this.props.toggleMode}> Go back </button>
					</div>
				</div>
			</form>
        </div>
      );
    }
}
