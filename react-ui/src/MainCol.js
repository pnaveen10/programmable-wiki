import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import EditMode from './EditMode';
import ViewMode from './ViewMode';

export default class MainCol extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
        this.toggleMode = this.toggleMode.bind(this);
    }
    toggleMode() {
        var e = this.state.editMode;
        this.setState({ editMode: !e });
    }
	render() {
		return (
			<div className="col-md-9 textleft">
				{this.state.editMode
                    ? <EditMode toggleMode={this.toggleMode}/>
                    : <ViewMode toggleMode={this.toggleMode}/>
                }
			</div>
		);
	}
}