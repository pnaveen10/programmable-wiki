import React, { Component } from 'react';
import {Treebeard} from 'react-treebeard';
import './App.css';
import $ from "jquery";
import { Link } from 'react-router';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'Home',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'Page 1',
            loading: true,
            children: []
        },
        {
            name: 'Page 2',
            children: [
                {
                    name: 'Page 2',
                    children: [
                        { name: 'child 1' },
                        { name: 'child 2' }
                    ]
                }
            ]
        }
    ]
};

export default class SideCol extends React.Component {
	render() {
		return (
			<div className="col-sm-3 sidebar" style={this.props.style}>
				<h4 className="textleft">Side Pane</h4>
				<div className="input-group textleft">
					<input type="text" className="form-control" placeholder="Search Pages.."/>
					<span className="input-group-btn">
						<button className="btn btn-default" type="button">
							<span className="glyphicon glyphicon-search"></span>
						</button>
					</span>
				</div>
				<ul className="nav nav-pills nav-stacked textleft">
					<li className="active"><Link to="page/42">Page 1</Link></li>
					<li><Link to="test">Test</Link></li>
					<li><a href="#section2">Page 2</a></li>
					<li><a href="#section3">Page 3</a></li>
					<li><a href="#section3">Page 4</a></li>
				</ul>
			</div>
		)
	}
}
