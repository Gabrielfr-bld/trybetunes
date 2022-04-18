import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ userName: value });
  }

  handleClick = () => {
    const { userName } = this.state;
    const { history } = this.props;
    const user = { userName };
    this.setState({
      loading: true,
    },
    async () => {
      await createUser(user);
      await history.push('search');
    });
  }

  render() {
    const { userName, loading } = this.state;
    const minCharacters = 3;

    if (loading) return <Loading />;

    return (
      <form
        className="text-center
        shadow-lg
        p-3 mb-5 bg-white rounded
        center"
      >
        <p>TrybeTunes</p>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <input
              className="form-control"
              type="text"
              id="name"
              value={ userName }
              placeholder="Digite seu nome"
              onChange={ this.handleChange }
              name="name"
            />
          </label>
          <div className="">
            <button
              className="btn btn-lg btn primary btn-block"
              disabled={ userName.length < minCharacters }
              type="button"
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Login;
