import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import MainCol from './MainCol';
import SideCol from './SideCol';

export default class MainGrid extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<SideCol/>
					<MainCol/>
				</div>
			</div>
		)
	}
}