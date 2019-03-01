/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Redirect } from 'react-router-dom';
import './app.css';
import GitHubLogin from 'react-github-login';
import githubLogo from './github-brands.svg';

const onFailure = response => console.error(response);

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.notificationDOMRef = React.createRef();
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(response) {
    fetch(`http://localhost:5000/githubAuth/access_token?code=${response.code}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((res) => {
        localStorage.setItem('token', res.token);
        this.addNotification(res.status, res.message);
        this.setState({ redirect: true });
      })
      .catch(console.log);
  }

  responseFacebook(response) {
    fetch('http://localhost:5000/facebook/profile',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.accessToken}`,
        },
      })
      .then(res => res.json())
      .then((res) => {
        localStorage.setItem('token', res.token);
        this.addNotification(res.status, res.message);
        this.setState({ redirect: true });
      })
      .catch(console.log);
  }

  addNotification(status, message) {
    this.notificationDOMRef.current.addNotification({
      title: 'Result:',
      message,
      type: status,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('http://localhost:5000/auth/login',
      {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
      .then(res => res.json())
      .then((res) => {
        localStorage.setItem('token', res.token);
        this.addNotification(res.status, res.message);
        this.setState({ redirect: true });
      })
      .catch(console.log);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/user" />;
    }
    return (
      <div>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleChange} placeholder="username" required name="username" />
              <input type="password" onChange={this.handleChange} placeholder="password" required name="password" />
              <button type="submit" value="Submit">login</button>
              <p className="message">
            Not registered?
                {' '}
                <a href="/signup">Create an account</a>
              </p>
            </form>
          </div>
        </div>
        <div style={{ textAlign: 'center' }} className="socials">
          <div>
            <FacebookLogin
              appId="332647670678632"
              fields="name,email,picture"
              callback={this.responseFacebook}
            />
          </div>
          <div>
            <span style={{ transition: 'opacity 0.5s ease 0s' }}>
              <GitHubLogin
                clientId="ed4f0f433db3e37aa087"
                redirectUri="http://localhost:5000/githubAuth/return"
                onSuccess={this.onSuccess}
                onFailure={onFailure}
                className="kep-login-github metro"
              />
            </span>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
