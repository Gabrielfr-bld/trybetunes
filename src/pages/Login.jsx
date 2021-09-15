import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleClick() {
    const { userName } = this.state;
    const newUser = { name: userName };
    this.setState({
      loading: true,
    });

    await createUser(newUser);
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { userName, loading, redirect } = this.state;
    const minCharacters = 3;

    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login">
        <form method="get">
          <label htmlFor="userName">
            <input
              type="text"
              data-testid="login-name-input"
              name="userName"
              value={ userName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ userName.length < minCharacters }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
