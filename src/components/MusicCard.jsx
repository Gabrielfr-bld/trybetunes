import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    const { music, onChange } = this.props;
    onChange(event, music);
  }

  render() {
    const { music, checked } = this.props;
    const { trackName, previewUrl, trackId } = music;

    return (
      <section>
        <h1>{ trackName }</h1>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            checked={ checked }
            type="checkbox"
            id={ trackId }
            onChange={ this.handleChange }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
