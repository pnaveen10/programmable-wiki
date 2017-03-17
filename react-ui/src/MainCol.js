import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class MainCol extends React.Component {
	render() {
		return (
			<div className="col-md-9 textleft">
				{/* {this.state.editMode
                    ? <EditMode toggleMode={this.toggleMode}/>
                    : <ViewMode toggleMode={this.toggleMode}/>
                } */}
				{this.props.children}
			</div>
		);
	}
}
