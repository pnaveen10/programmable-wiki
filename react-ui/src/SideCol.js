import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class SideCol extends React.Component {
	render() {
		return (
			<div className="col-sm-3 sidebar">
				<h4 className="textleft">Side Pane</h4>
				<ul className="nav nav-pills nav-stacked textleft">
					<li className="active"><a href="#section1">Page 1</a></li>
					<li><a href="#section2">Page 2</a></li>
					<li><a href="#section3">Page 3</a></li>
					<li><a href="#section3">Page 4</a></li>
				</ul><br/>
				<div className="input-group textleft">
					<input type="text" className="form-control" placeholder="Search Pages.."/>
					<span className="input-group-btn">
						<button className="btn btn-default" type="button">
							<span className="glyphicon glyphicon-search"></span>
						</button>
					</span>
				</div>
			</div>
		)
	}
}
