import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import InputFavorites from './InputFavorites';

class MusicCard extends Component {
  render() {
    const { musics, handleClick, loading, idTarget, favorites } = this.props;
    return (
      loading ? <Loading /> : musics.map((music) => (
        <div key={ music.trackId }>
          <p>{music.trackName}</p>
          <audio src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <InputFavorites
            trackId={ music.trackId }
            handleClick={ handleClick }
            idTarget={ idTarget }
            favorites={ favorites }
          />
        </div>
      ))
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  idTarget: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MusicCard;
