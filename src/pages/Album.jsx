import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
    };
    this.getMusics = this.getMusics.bind(this);
  }

  componentDidMount() {
    this.getMusics();
  }

  async getMusics() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const musics = await getMusics(id);
      this.setState({ musics, loading: false });
    });
  }

  render() {
    const { musics, loading } = this.state;

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
          {musics.slice(1).map(({ trackName, previewUrl }, index) => (
            <MusicCard
              key={ index }
              trackName={ trackName }
              previewUrl={ previewUrl }
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
