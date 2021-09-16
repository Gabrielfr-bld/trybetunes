import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  handleChange(event, music) {
    this.setState({ loading: true }, async () => {
      await removeSong(music);
      this.getFavoriteSongs();
    });
  }

  async getFavoriteSongs() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites, loading: false });
  }

  render() {
    const { favorites, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-favorites">
        {favorites.map((music, index) => (
          <MusicCard
            key={ index }
            music={ music }
            checked={ favorites.some((favorite) => favorite.trackId === music.trackId) }
            onChange={ this.handleChange }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
