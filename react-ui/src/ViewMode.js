import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class ViewMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          compiledOutput : '',
          pageTitle : '',
          pageDesc : ''
        }
        this.renderCompiledOutput = this.renderCompiledOutput.bind(this);
        this.renderTitleAndDescription = this.renderTitleAndDescription.bind(this);
        this.addNewPage = this.addNewPage.bind(this);
    }

    componentDidMount() {
        this.renderCompiledOutput(this.props.pageId);
        this.renderTitleAndDescription(this.props.pageId);
    }

    addNewPage() {
        this.context.router.push('/page/newpage');
    }

    renderTitleAndDescription(page_id) {
      var root = 'http://10.29.244.95:3001';

      $.ajax({
        url: root + '/get_details/' +page_id,
        method: 'GET',
        success: function(data) {
          this.setState({pageTitle : JSON.parse(data).title})
          this.setState({pageDesc : JSON.parse(data).description})
        }.bind(this)
      });

    }

    renderCompiledOutput(page_id) {
        var root = 'http://10.29.244.95:3001';

        $.ajax({
          url: root + '/view_page/' +page_id,
          method: 'GET',
          success: function(data) {
            this.setState({compiledOutput : data})
          }.bind(this)
        }
      );
    }

    render() {
      return (
			<div className = "medium-6">
				<h2>{this.state.pageTitle}</h2>
				<p className="text-muted"><i>{this.state.pageDesc}</i></p>>
				<div dangerouslySetInnerHTML={{__html: this.state.compiledOutput }}></div>
				<div>
					<span className="buttongroup"><button className="btn btn-primary" type="button" onClick={this.props.toggleMode}> Edit </button></span>
					<span className="buttongroup"><button className="btn btn-primary" type="button" onClick={this.addNewPage}> Add page </button></span>
				</div>
			</div>
		);
    }
}

ViewMode.contextTypes = {
  router: React.PropTypes.object.isRequired
}
