import React, { Component } from 'react';
import AlbumContainer from '../components/AlbumContainer';
import Loading from './Loading';
import InputSearch from '../components/InputSearch';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      nameArtist: '',
      albuns: [],
      loading: false,
      waitReturn: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      nameArtist: value,
    });
  }

  fetchAlbuns = () => {
    const { nameArtist } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const searchApi = await searchAlbumsAPI(nameArtist);
        await this.setState({
          loading: false,
          albuns: searchApi,
          waitReturn: true,
        });
      },
    );
  }

  render() {
    const { loading, nameArtist, waitReturn, albuns } = this.state;

    return (
      <section data-testid="page-search">
        {loading ? <Loading /> : <InputSearch
          handleChange={ this.handleChange }
          nameArtist={ nameArtist }
          fetchAlbuns={ this.fetchAlbuns }
        />}
        <div>
          {waitReturn ? <AlbumContainer albuns={ albuns } nameArtist={ nameArtist } />
            : null}
        </div>
      </section>
    );
  }
}

export default Search;
