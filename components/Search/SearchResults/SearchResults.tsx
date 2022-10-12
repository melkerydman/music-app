import React from 'react';
import { Album } from '../../../types/album';
import { Artist } from '../../../types/artist';
import { Track } from '../../../types/track';

import styles from './SearchResults.module.scss';

// TODO: Correct name and type/interface

interface Props {
  topResult?: Artist | Track | Album;
  artists?: Artist[];
  tracks?: Track[];
}
const SearchResults = ({ topResult, artists, tracks }: Props) => {
  return (
    <div className={styles['search-results']}>
      SearchResults
      <div>Top result: {topResult?.name}</div>
      {tracks.map((track) => {
        return <div>Track: {track.name}</div>;
      })}
      {artists.map((artist) => {
        return <div>Artist: {artist.name}</div>;
      })}
    </div>
  );
};

export default SearchResults;
