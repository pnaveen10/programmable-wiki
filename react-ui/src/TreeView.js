import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard, decorators} from 'react-treebeard';
import { Link } from 'react-router';

decorators.Header = (props) => {
    const style = props.style;
    return (
        <div style={style.base}>
            <div style={style.title}>
				<Link to={"page/" + props.node.id}>{props.node.name}</Link>
            </div>
        </div>
    );
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
		var style= {
			tree: {
				base: {
					listStyle: 'none',
					backgroundColor: '#DDD',
					margin: 0,
					padding: 0,
					color: '#111111',
					fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
					fontSize: '14px'
				},
				node: {
					base: {
						position: 'relative',
					},
					link: {
						cursor: 'pointer',
						position: 'relative',
						padding: '0px 5px',
						display: 'block'
					},
					activeLink: {
						background: '#337ab7'
					},
					toggle: {
						base: {
							position: 'relative',
							display: 'inline-block',
							verticalAlign: 'top',
							marginLeft: '-5px',
							marginTop: '-3px',
							height: '24px',
							width: '24px'
						},
						wrapper: {
							position: 'absolute',
							top: '50%',
							left: '75%',
							margin: '-7px 0 0 -7px',
							height: '14px'
						},
						height: 10,
						width: 10,
						arrow: {
							fill: '#9DA5AB',
							strokeWidth: 0
						}
					},
					header: {
						base: {
							display: 'inline-block',
							verticalAlign: 'top',
							color: '#111111'
						},
						connector: {
							width: '2px',
							height: '12px',
							borderLeft: 'solid 2px black',
							borderBottom: 'solid 2px black',
							position: 'absolute',
							top: '0px',
							left: '-21px'
						},
						title: {
							lineHeight: '24px',
							verticalAlign: 'middle'
						}
					},
					subtree: {
						listStyle: 'none',
						paddingLeft: '19px'
					}
				}
			}
		}

        return (
			<div className="treeview">
				<Treebeard
					data={this.props.data}
					onToggle={this.onToggle}
					style={style}
					decorators={decorators}
				/>
			</div>
        );
    }
}
