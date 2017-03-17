import React, { Component } from 'react';
import './App.css';
import $ from "jquery";

export default class ViewMode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          compiledOutput : ''
        }
        this.renderCompiledOutput = this.renderCompiledOutput.bind(this);
        // this.updateState = this.updateState.bind(this);
    }


    componentDidMount() {
        console.log("Agh")
        this.renderCompiledOutput(this.props.pageId);
    }


    renderCompiledOutput(page_id) {
        var root = 'http://10.29.244.95:3001';

        $.ajax({
          url: root + '/view_page/' +page_id,
          method: 'GET',
          success: function(data) {
            console.log(data)
            this.setState({compiledOutput : data})
            return data;
          }.bind(this)
        }
      );
    }

    render() {
      return (
    <div className = "medium-6">
			<h2> Title </h2>
      { console.log(this.props.pageId )}
			{ this.state.compiledOutput }
			<div>
				<button className="btn btn-primary" type="button" onClick={this.props.toggleMode}> Edit </button>
				<button className="btn btn-primary" type="button" onClick={this.testAPI}> Add page </button>
			</div>
    </div>
      );
    }
}
