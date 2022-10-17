import React from 'react';
import { Heading } from '../../Typography/Typography';
import ListItem from '../ListItem/ListItem';

import styles from './SearchResults.module.scss';

// TODO: Create real types somewhere

type QuickSearchType = {
  href: string;
  image: string;
  heading: string;
  subHeading?: string[];
  type: string;
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
  } else
    return (
      <ul className={styles['search-results']}>
        {topResult && (
          <li>
            <Heading as="h4">Top Result</Heading>

            <ul>
              <ListItem content={topResult}></ListItem>
            </ul>
          </li>
        )}
        {tracks.length > 0 && (
          <li>
            <Heading as="h4">Tracks</Heading>
            <ul>
              {tracks.map((track, index) => (
                <ListItem key={index} content={track}></ListItem>
              ))}
            </ul>
          </li>
        )}
        {artists.length > 0 && (
          <li>
            <Heading as="h4">Artists</Heading>
            <ul>
              {artists.map((artist, index) => (
                <ListItem key={index} content={artist}></ListItem>
              ))}
            </ul>
          </li>
        )}
        {albums.length > 0 && (
          <li>
            <Heading as="h4">Albums</Heading>
            <ul>
              {albums.map((album, index) => (
                <ListItem key={index} content={album}></ListItem>
              ))}
            </ul>
          </li>
        )}
      </ul>
    );
};

export default SearchResults;
