import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSearch extends Component {
  render() {
    const CARACTER_MIN = 2;
    const { nameArtist, handleChange, fetchAlbuns } = this.props;
    return (
      <section className="col-md-6 offset-md-3">
        <input
          type="text"
          className="form-control"
          name="artista"
          onChange={ handleChange }
          placeholder="Nome do artista"
        />
        <button
          className="col-md-6 offset-md-3 btn btn-outline-secondary"
          disabled={ nameArtist.length < CARACTER_MIN }
          type="submit"
          onClick={ fetchAlbuns }
        >
          Pesquisar
        </button>
      </section>
    );
  }
}

InputSearch.propTypes = {
  nameArtist: PropTypes.string,
  handleChange: PropTypes.func,
  fetchAlbuns: PropTypes.func,
}.isRequired;

export default InputSearch;
