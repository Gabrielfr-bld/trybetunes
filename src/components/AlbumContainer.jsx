import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

class AlbumContainer extends Component {
  render() {
    const { artist, albuns } = this.props;
    const albumCards = albuns.map((album) => (
      <>
        <>
          <AlbumCard
            key={ album.collectionId }
            album={ album }
          />
          <div className="card h-100 d-block" style={ { width: '12rem' } }>
            <img
              className="card-img-top"
              src={ album.artworkUrl100 }
              alt={ album.collectionName }
            />
          </div>
        </>
        <div className="card-body">
          <h5 className="card-title">{album.collectionName}</h5>
          <p className="card-text">{album.artist}</p>
        </div>
      </>
    ));
    return (
      <section>
        <p>
          Resultado de álbuns de:
          {' '}
          { artist }
        </p>
        <div className="card-group">
          {albuns.length === 0 ? <p>Nenhum álbum foi encontrado</p> : albumCards}
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
