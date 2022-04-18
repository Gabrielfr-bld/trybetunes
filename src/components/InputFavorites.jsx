import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputFavorites extends Component {
  defaultCheck = () => {
    const { trackId, favorites } = this.props;
    const trackString = String(trackId);

    const filterSong = favorites.filter((id) => id === trackId);
    if (filterSong.length !== 0) return true;

    const defaultTrue = favorites.find((id) => id === trackString);
    if (defaultTrue === trackString) return true;
  }

  render() {
    const { trackId, handleClick } = this.props;
    return (
      <label htmlFor={ trackId }>
        Favorita
        <input
          type="checkbox"
          id={ trackId }
          onClick={ handleClick }
          defaultChecked={ this.defaultCheck() }
        />
      </label>
    );
  }
}

InputFavorites.propTypes = {
  trackId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default InputFavorites;
