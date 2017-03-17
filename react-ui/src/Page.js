import React, { Component } from 'react';
import EditMode from './EditMode';
import ViewMode from './ViewMode';

export default class Page extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
        this.toggleMode = this.toggleMode.bind(this);
        this.createNewPage = this.createNewPage.bind(this);
    }
    toggleMode(value) {
        this.setState({ editMode: value });
    }
    createNewPage() {
        this.setState({
            editMode: true,
            type: 'new'
        });
    }
    render() {
        console.log(this.props.params.pageId);
		return (
			<div>
                {this.state.editMode || this.props.params.pageId == 'newpage'
                    ? <EditMode pageId={this.props.params.pageId} toggleMode={this.toggleMode} type={this.state.type}/>
                    : <ViewMode pageId={this.props.params.pageId} toggleMode={this.toggleMode}/>
                }
            </div>
        );
    }
}
