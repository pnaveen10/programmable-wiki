import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class NavBar extends React.Component {
	render() {
		return (
			<nav className="navbar">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Programmable WIKI</a>
					</div>
					<ul className="nav navbar-nav">
						<li className="active"><a href="#">Home</a></li>
						<li><a href="#">Preferences</a></li>
						<li><a href="#">Help</a></li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<li><a href="#"><span className="glyphicon glyphicon-user"></span> {this.props.username}</a></li>
						<li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
					</ul>
				</div>
			</nav>
		)
	}
}
