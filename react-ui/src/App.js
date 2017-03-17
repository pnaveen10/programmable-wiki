import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

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

class NavBar extends Component {
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

class MainGrid extends Component {
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

class SideCol extends Component {
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

class MainCol extends Component {
	render() {
		return (
			<div className="col-md-9 textleft">
				Main Panel
			</div>
		)
	}
}

export default App;
