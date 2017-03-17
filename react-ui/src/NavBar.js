import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class NavBar extends React.Component {
	render() {
		return (
			<nav className="navbar">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Programable WIKI</a>
					</div>
					<ul className="nav navbar-nav">
						<li className="active"><a href="#">Home</a></li>
						<li><a href="#">Page 1</a></li>
						<li><a href="#">Page 2</a></li>
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