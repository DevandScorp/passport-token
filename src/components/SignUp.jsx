/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../app.css';
import ReactNotification from 'react-notifications-component';
import { Redirect } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
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
    fetch('http://localhost:5000/auth/register',
      {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          lastname: this.state.lastname,
          firstname: this.state.firstname,
          username: this.state.username,
          password: this.state.password,
        }),
      })
      .then(res => res.json())
      .then((res) => {
        this.addNotification(res.status, res.message);
        setTimeout(() => { this.setState({ redirect: true }); }, 1000);
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
      return <Redirect to="/" />;
    }
    return (
      <div className="login-page">
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="form">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} required placeholder="username" name="username" />
            <input type="text" onChange={this.handleChange} required placeholder="firstname" name="firstname" />
            <input type="text" onChange={this.handleChange} required placeholder="lastname" name="lastname" />
            <input type="password" onChange={this.handleChange} required placeholder="password" name="password" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
