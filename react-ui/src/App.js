import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import NavBar from './NavBar';
import MainGrid from './MainGrid';

class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar username="Naveen"/>
				<MainGrid>{this.props.children}</MainGrid>
			</div>
		);
	}
}

export default App;
