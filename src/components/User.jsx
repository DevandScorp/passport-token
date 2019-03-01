import React, { Component, Fragment } from 'react';
import './user.scss';

class User extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      imageURL: '',
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    fetch('http://localhost:5000/user/profile',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          firstname: res.firstname,
          lastname: res.lastname,
          imageURL: res.imageURL,
          username: res.username,
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <article className="card">
        <header style={{ backgroundImage: `url(${this.state.imageURL})` }} className="card-header" />
        <div className="card-body">
          <p className="date">
            Firstname:
            {' '}
            {this.state.firstname}
          </p>
          <p className="date">
            Lastname:
            {' '}
            {this.state.lastname}
          </p>

          <h2>{this.state.username}</h2>
        </div>
      </article>
    );
  }
}

export default User;
