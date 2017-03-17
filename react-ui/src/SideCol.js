import React, { Component } from 'react';
import TreeView from './TreeView';
import './App.css';
import $ from "jquery";
import { Link } from 'react-router';

const data = {
    name: 'root',
	id: '42',
    children: [
        {
            name: 'parent with child',
			id: 'test',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'parent with out child'
        },
        {
            name: 'parent with child',
            children: [
                {
                    name: 'child with child',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

export default class SideCol extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			data : {
				name: 'loading...'
			}
        }
        this.getInfo = this.getInfo.bind(this);
    }
	componentDidMount() {
		this.getInfo();
	}
	getInfo() {
        var root = 'http://10.29.244.95:3001';
//		setTimeout(function() {
//					this.setState({data: {name:'loaded'}});
//				}.bind(this),
//				2000
//			);
//		$.ajax({
//			url: root + '/edit_page/',
//			method: 'GET',
//			success: function(data) {
//				setTimeout(function() {
//						//this.setState({data : JSON.parse(data)})
//					},
//					2000
//				).bind(this);
//			}.bind(this)
//		});
    }
	render() {
		return (
			<div className="col-sm-3 sidebar textleft" style={this.props.style}>
				<h4 className="textleft">Page Tree</h4>
				<div className="input-group textleft">
					<input type="text" className="form-control" placeholder="Search Pages.."/>
					<span className="input-group-btn">
						<button className="btn btn-default" type="button">
							<span className="glyphicon glyphicon-search"></span>
						</button>
					</span>
				</div>
				<TreeView data={this.state.data}/>
			</div>
		)
	}
}
