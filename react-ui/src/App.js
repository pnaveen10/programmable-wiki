import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import NavBar from './NavBar';
import MainGrid from './MainGrid';

class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar username="Username"/>
				<MainGrid/>
			</div>
		);
	}
}

export default App;
