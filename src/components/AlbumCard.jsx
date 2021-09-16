import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { album: {
      collectionId,
      collectionName,
      artistName,
    } } = this.props;

    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ { pathname: `/album/${collectionId}`,
          state: { collectionName, artistName } } }
      >
        {collectionName}
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.string,
    collectionName: PropTypes.string,
  }),
}.isRequired;

export default AlbumCard;
