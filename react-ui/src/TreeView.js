import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

const data = {
    name: 'root',
    children: [
        {
            name: 'parent with child',
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

export default class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled) {
        if(this.state.cursor) {
			this.state.cursor.active = false;
		}
        node.active = true;
        if(node.children) {
			node.toggled = toggled;
		}
        this.setState({ cursor: node });
    }
    render() {
        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
            />
        );
    }
}
