import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
      favorites: [],
    };
    this.getMusics = this.getMusics.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFavoriteSongs = this.getFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.getMusics();
    this.getFavoriteSongs();
  }

  handleChange({ target }, music) {
    const modifySong = target.checked ? addSong : removeSong;
    this.setState({ loading: true }, async () => {
      await modifySong(music);
      this.getFavoriteSongs();
    });
  }

  async getMusics() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const musics = await getMusics(id);
      this.setState({ musics });
    });
  }

  getFavoriteSongs() {
    this.setState({ loading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({ favorites, loading: false });
    });
  }

  render() {
    const { musics, loading, favorites } = this.state;

    if (loading) return <Loading />;

    return (
      <section data-testid="page-album">
        <h2 data-testid="artist-name">
          { musics[0].artistName }
        </h2>
        <h3 data-testid="album-name">
          { musics[0].collectionName }
        </h3>
        <section>
          {musics.slice(1).map((music, index) => (
            <MusicCard
              key={ index }
              music={ music }
              checked={ favorites.some((favorite) => favorite.trackId === music.trackId) }
              onChange={ this.handleChange }
            />
          ))}
        </section>
      </section>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      collectionName: PropTypes.string,
      artistName: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
