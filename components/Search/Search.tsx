import { useEffect, useState } from 'react';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';

import styles from './Search.module.scss';

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState();

  // TODO: handle access token storage (on server, cookie?)
  useEffect(() => {
    const getToken = async () => {
      setAccessToken(await useSpotifyAuth());
    };
    getToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    const searchForTrack = async (string, accessToken) => {
      const defaultSpotifyUrl = 'https://api.spotify.com/v1';
      const headers = {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      const query = string;
      const type = 'track,artist,album';
      const limit = 10;
      const url = `${defaultSpotifyUrl}/search?q=${query}&type=${type}&limit=${limit}`;

      const result = await fetch(url, { headers })
        .then((response) => response.json())
        .then((data) => {
          // Return formatted search results
          return data;
          // return data.tracks.items.map((track) => {
          //   return {
          //     id: track.id,
          //     isrc: track.external_ids.isrc,
          //     title: track.name,
          //     artists: track.artists,
          //     album: {
          //       title: track.album.name,
          //       year: track.album.release_date.substring(0, 4),
          //     },
          //     coverLarge: track.album.images[0],
          //     coverMedium: track.album.images[1],
          //     coverSmall: track.album.images[2],
          //   };
          // });
        });
      console.log('results 🔴', result);
    };
    searchForTrack(searchValue, accessToken);
  }, [searchValue]);

  return (
    <div className={styles['search']}>
      <input
        className={styles['search_input']}
        id="search"
        name="search"
        type="text"
        placeholder="Search for artist, song or album"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchResults.length >= 0 && (
        <div className={styles['search_results']}>Search results</div>
      )}
    </div>
  );
};
export default Search;
