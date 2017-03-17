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
    }

    componentDidMount() {
        this.renderCompiledOutput(this.props.pageId);
        this.renderTitleAndDescription(this.props.pageId);
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
			<h2> {this.state.pageTitle} </h2>
      <h4> {this.state.pageDesc} </h4>
			{ this.state.compiledOutput }
			<div>
				<button className="btn btn-primary" type="button" onClick={this.props.toggleMode}> Edit </button>
				<button className="btn btn-primary" type="button" onClick={this.testAPI}> Add page </button>
			</div>
    </div>
      );
    }
}
