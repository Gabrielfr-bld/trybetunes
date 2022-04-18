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
      loading: false,
      favorites: [],
      idTarget: '',
    };
  }

  async componentDidMount() {
    this.getLocalStorage();
    this.fetchMusics();
  }

  getLocalStorage = async () => {
    const response = await getFavoriteSongs();
    const idFavoritesLocal = response.map(({ trackId }) => String(trackId));
    this.setState({
      favorites: idFavoritesLocal,
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

  removeStateCheck = (id, checked) => {
    const { favorites } = this.state;
    const removeSelect = favorites.indexOf(id);
    if (!checked) favorites.splice(removeSelect, 1);
    this.setState({
      favorites,
    });
  }

  async fetchMusics() {
    const { match } = this.props;
    const { id } = match.params;
    const saveFetch = await getMusics(id);
    this.setState({
      musics: saveFetch,
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
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Album;
