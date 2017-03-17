import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Testpage from './Testpage';
import Page from './Page';
import './index.css';
import { Link, hashHistory, Router, Route, IndexRoute } from 'react-router';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Page} />
            <Route path="page(/:pageId)" component={Page}/>
            <Route path='test' component={Testpage} />
        </Route>
    </Router>
    ),
  document.getElementById('root')
);
