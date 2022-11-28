import React from 'react';
import ListItems from '../ListItems/ListItems';

import styles from './SearchResults.module.scss';

// TODO: Create real types somewhere

type QuickSearchType = {
  href: string;
  image: string;
  heading: string;
  subHeading?: string[];
  type: string;
  id: string;
};
type Props = {
  topResult?: QuickSearchType;
  albums?: QuickSearchType[];
  artists?: QuickSearchType[];
  tracks?: QuickSearchType[];
};

const SearchResults = ({ topResult, albums, artists, tracks }: Props) => {
  // TODO: Maybe clean up and break out components. Better handling of empty result?
  if (
    !topResult &&
    albums.length === 0 &&
    artists.length === 0 &&
    tracks.length === 0
  ) {
    return (
      <ul className={styles['search-results']}>
        <li>No results found.</li>
      </ul>
    );
  }
  return (
    <ul className={styles['search-results']}>
      {tracks.length > 0 && (
        <ListItems data={[topResult]} heading="Top Result" />
      )}
      {tracks.length > 0 && <ListItems data={tracks} heading="Tracks" />}
      {artists.length > 0 && <ListItems data={artists} heading="Artists" />}
      {albums.length > 0 && <ListItems data={albums} heading="Albums" />}
    </ul>
  );
};

export default SearchResults;
