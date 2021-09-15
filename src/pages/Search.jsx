import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { searchInput } = this.state;
    const minCharacters = 2;

    return (
      <div data-testid="page-search">
        <input
          data-testid="search-artist-input"
          name="searchInput"
          value={ searchInput }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ searchInput.length < minCharacters }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
