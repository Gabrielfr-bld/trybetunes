import React, { Component } from 'react';
import AlbumContainer from '../components/AlbumContainer';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      albuns: [],
      artist: '',
      show: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleClick() {
    const { searchInput } = this.state;
    const artist = searchInput;
    this.setState({
      loading: true, artist,
    });
    const albuns = await searchAlbumsAPI(artist);
    this.setState({ albuns, searchInput: '', loading: false, show: true });
  }

  render() {
    const { searchInput, loading, artist, show, albuns } = this.state;
    const minCharacters = 2;

    if (loading) return <Loading />;

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
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        { show ? <AlbumContainer artist={ artist } albuns={ albuns } /> : null }
      </div>
    );
  }
}

export default Search;
