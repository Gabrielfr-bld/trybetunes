import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormUser extends Component {
  render() {
    const {
      description, email, image, name, handleChange, handleClick, enable,
    } = this.props;
    return (
      <form className="mb-3">
        <label className="form-label" htmlFor="name">
          Name
          <input
            type="text"
            className="form-control"
            placeholder={ name }
            name="name"
            id="name"
            value={ name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="text"
            className="form-control"
            placeholder={ email }
            name="email"
            id="email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="dexcription">
          Descrição
          <input
            type="text"
            className="form-control"
            placeholder={ description }
            name="description"
            id="description"
            value={ description }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="image">
          <input
            type="text"
            className="form-control"
            placeholder="insira um link"
            name="image"
            id="image"
            value={ image }
            onChange={ handleChange }
          />
        </label>
        <button
          className="btn btn-primary"
          type="button"
          disabled={ !enable }
          onClick={ handleClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

FormUser.propTypes = {
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  enable: PropTypes.bool.isRequired,
};
