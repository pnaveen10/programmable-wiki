import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import './App.css';
import $ from "jquery";

import 'brace/mode/python';
import 'brace/mode/perl';
import 'brace/mode/html';
import 'brace/mode/markdown';
import 'brace/theme/terminal';

export default class EditMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editContent: {
                title: '',
                description: '',
                type: 'text',
                code: ''
            }
        };
        this.updateState = this.updateState.bind(this);
        this.validateState = this.validateState.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.textAreaChange = this.textAreaChange.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
    }

    toggleMode() {
        this.props.toggleMode(false);
    }

    componentDidMount() {
        if (this.props.pageId != 'newpage') {
            this.getInfo(this.props.pageId);
        }
    }

    getInfo(page_id) {
        var root = 'http://10.29.244.95:3001';

        $.ajax({
          url: root + '/edit_page/' +page_id,
          method: 'GET',
          success: function(data) {
            this.setState({editContent : JSON.parse(data)})
          }.bind(this)
        }
      );
    }

    updateState(e) {
        var fieldName = e.target.name;
        var value = e.target.value;
        var newLocalState = this.state.editContent;

        switch (fieldName) {
            case "title":
                newLocalState.title = value;
                break;
            case "desc":
                newLocalState.description = value;
                break;
            case "type":
                newLocalState.type = value;
                break;
        }

        this.setState({editContent : newLocalState});
    }

    textAreaChange(codeText) {
        var newLocalState = this.state.editContent;
        newLocalState.code = codeText;
        this.setState({editContent : newLocalState});
    }

    validateState(event) {
      event.preventDefault();
      var formState = this.state.editContent;

      if(formState.title && formState.description && formState.type && formState.code ) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://10.29.244.95:3001/save_or_edit', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function () {
        };

        xhr.send(JSON.stringify({id: (this.props.pageId != 'newpage' ? this.props.pageId : ''), parent_id: '1', form_data:{title: formState.title, desc:formState.description, code:formState.code, type: formState.type}}));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var respOut = JSON.parse(xhr.responseText);
                this.props.toggleMode(false);
                this.context.router.push('/page/'+respOut.id);
            }
        }.bind(this);
      }
      else {
      }
    }

    render() {
		var style = {
			width: "100%"
		};
		return (
			<div>
				<form onSubmit={this.validateState} className="form-horizontal">
					<div className="form-group">
						<label className="control-label col-sm-2"> Title </label>
						<div className="col-sm-10">
							<input className="form-control" placeholder="Name of the page" type="text" name="title" value={this.state.editContent.title} onChange={this.updateState}/>
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2"> Description </label>
						<div className="col-sm-10">
							<input className="form-control" placeholder="Description about page" type="text" name="desc" value={this.state.editContent.description} onChange={this.updateState}/>
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2"> Type </label>
						<div className="col-sm-10">
							<select className="form-control"  name="type" value={this.state.editContent.type} onChange={this.updateState}>
								<option value="text">Plain text</option>
                                <option value="html">HTML</option>
                                <option value="python">Python</option>
                                <option value="perl">Perl</option>
							</select>
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2">Code</label>
						<div className="col-sm-10">
							<AceEditor
                                mode={this.state.editContent.type}
                                theme="terminal"
                                style={style}
                                name="UNIQUE_ID_OF_DIV"
								enableBasicAutocompletion="true"
								enableLiveAutocompletion="true"
                                editorProps={{$blockScrolling: true}}
                                value={this.state.editContent.code}
                                onChange={this.textAreaChange}
                             />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<input className="btn btn-default" type="submit" className="btn" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button className="btn btn-default" type="button" onClick={this.toggleMode}> Go back </button>
						</div>
					</div>
				</form>
			</div>
		);
    }
}

EditMode.contextTypes = {
  router: React.PropTypes.object.isRequired
}
