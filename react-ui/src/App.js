import React, {Component} from 'react';
import './App.css';
import $ from "jquery";
import EditMode from './EditMode';
import ViewMode from './ViewMode';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
        this.toggleMode = this.toggleMode.bind(this);
    }
    toggleMode() {
        var e = this.state.editMode;
        this.setState({ editMode: !e });
    }
	render() {
		return (
			<div>
				<div>
					<h2>Welcome to Wiki</h2>
				</div>
                {this.state.editMode
                    ? <EditMode toggleMode={this.toggleMode}/>
                    : <ViewMode toggleMode={this.toggleMode}/>
                }
			</div>
		);
	}
}

export default App;
