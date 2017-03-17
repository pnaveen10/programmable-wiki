import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import MainCol from './MainCol';
import SideCol from './SideCol';

export default class MainGrid extends React.Component {
	componentDidMount() {
		this.updateHeight();
	}
	constructor(props) {
        super(props);
        this.state = {
            sidebarheight: 0
        };
        this.updateHeight = this.updateHeight.bind(this);
    }
    updateHeight() {
        this.setState({sidebarheight: $(window).height() - 53})
    }
	render() {
		var style = {
			height: this.state.sidebarheight
		}
		return (
			<div className="container-fluid">
				<div className="row content" style={style}>
					<SideCol style={style}/>
					<MainCol>{this.props.children}</MainCol>
				</div>
			</div>
		)
	}
}
