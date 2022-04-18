import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      musicFavorites: [],
      favorites: [],
      idTarget: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.funcGetFavorites();
  }

  funcGetFavorites = async () => {
    const response = await getFavoriteSongs();
    const idFavoritesLocal = response.map(({ trackId }) => String(trackId));
    this.setState({
      musicFavorites: response,
      favorites: idFavoritesLocal,
    });
  }

  handleClick = (event) => {
    const { id, checked } = event.target;
    const { musicsFavorites } = this.state;
    const removeMusicFav = musicsFavorites.find((music) => music.trackId === Number(id));
    this.setState({
      loading: true,
      idTarget: id,
    },
    async () => {
      await this.removeStateCheck(id, checked);
      await removeSong(removeMusicFav);
      await this.funcGetFavorites();
      this.setState({
        loading: false,
      });
    });
  }

  removeStateCheck = (id, checked) => {
    const { favorites } = this.state;
    const removeSelect = favorites.indexOf(id);
    if (!checked) favorites.splice(removeSelect, 1);
    this.setState({
      favorites,
    });
  }

  render() {
    const { musicFavorites, loading, favorites, idTarget } = this.state;
    return (
      <div data-testid="page-favorites">
        <h1>Favoritas</h1>
        <div>
          <MusicCard
            musics={ musicFavorites }
            handleClick={ this.handleClick }
            idTarget={ idTarget }
            favorites={ favorites }
            loading={ loading }
          />
        </div>
      </div>
    );
  }
}

export default Favorites;
