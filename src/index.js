/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import User from './components/User';
import SignUp from './components/SignUp';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <div className="header">
        <div><a href="/">Home</a></div>
        <div><a href="/user">User</a></div>
        <div><a href="/signup">Sign Up</a></div>
      </div>

      <Route exact path="/" component={App} />
      <Route exact path="/user" component={User} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
