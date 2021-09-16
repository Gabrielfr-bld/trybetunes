import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class AlbumContainer extends Component {
  render() {
    const { artist, albuns } = this.props;
    const albumCards = albuns.map((album) => (
      <AlbumCard
        key={ album.collectionId }
        album={ album }
      />
    ));
    return (
      <section>
        <p>
          Resultado de álbuns de:
          {' '}
          {artist}
        </p>
        <div>
          { albuns.length === 0 ? <p>Nenhum álbum foi encontrado</p> : albumCards}
        </div>
      </section>
    );
  }
}

AlbumContainer.propTypes = {
  artist: PropTypes.string,
  albuns: PropTypes.array,
}.isRequired;

export default AlbumContainer;