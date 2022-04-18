import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
      favorites: [],
      idTarget: '',
    };
    this.getMusics = this.getMusics.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFavoriteSongs = this.getFavoriteSongs.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  getFavoriteSongs() {
    this.setState({ loading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({ favorites, loading: false });
    });
  }

  handleClick = (event) => {
    const { id, checked } = event.target;
    const { musics } = this.state;
    const musicFav = musics.find((music) => music.trackId === Number(id));
    this.setState(({ favorites }) => ({
      loading: true,
      favorites: checked ? [...favorites, id] : favorites,
      idTarget: id,
    }),
    async () => {
      if (checked) await addSong(musicFav);
      if (!checked) {
        await removeSong(musicFav);
        this.removeStateCheck(id, checked);
      }
      this.setState(() => ({
        loading: false,
      }));
    });
  }

  async getMusics() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const musics = await getMusics(id);
      this.setState({ musics });
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

  renderCoverArt = () => {
    const { musics } = this.state;
    const coverCd = musics[0];
    if (musics.length === 0) return <Loading />;
    return (
      <section className="card" style={ { width: '12rem' } }>
        <img
          className="card-image-top"
          src={ coverCd.artworkUrl100 }
          alt={ coverCd.collectionName }
        />
        <h3 className="card-body" data-testid="artist-name">{ coverCd.artistName }</h3>
        <div>
          <h4 className="card-tittle">{coverCd.collectionName}</h4>
          <h5>{coverCd.trackName}</h5>
        </div>
      </section>
    );
  }

  render() {
    const { musics, loading, favorites, idTarget } = this.state;
    const arrayMusic = musics.slice(1);
    if (loading) return <Loading />;

    return (
      <section data-testid="page-album">
        <Header />
        <div className="d-flex justify-content-evenly">
          {this.renderCoverArt()}
          <div className="scroll">
            <MusicCard
              musics={ arrayMusic }
              handleClick={ this.handleClick }
              idTarget={ idTarget }
              favorites={ favorites }
              loading={ loading }
            />
          </div>
        </div>
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
