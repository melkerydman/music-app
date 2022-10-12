import { useEffect, useState } from 'react';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import { Album } from '../../types/album';
import { Artist } from '../../types/artist';
import { Track } from '../../types/track';

import styles from './Search.module.scss';
import SearchResults from './SearchResults/SearchResults';

type SearchResultType = {
  topResult?: Artist | Track | Album;
  artists?: Artist[];
  tracks?: Track[];
};

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResultType>({});
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
    // TODO: Break everything out into its own service
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

      // TODO: Use axios instead of fetch
      const result = await fetch(url, { headers })
        .then((response) => response.json())
        .then((data) => {
          const maxTracks = 7;
          const maxArtists = 3;

          let tracks = [] as Track[];
          if (data.tracks.items.length > 0) {
            tracks = data.tracks.items.slice(0, maxTracks).map((track) => {
              return track;
            });
          }

          let artists = [];
          if (data.artists.items.length > 0) {
            artists = data.artists.items.slice(0, maxArtists).map((artist) => {
              return artist;
            });
          }

          // TODO: Test if this actually works
          let topResult = tracks[0] || artists[0];

          setSearchResults({ topResult, tracks, artists });
        });
    };

    if (searchValue === '') {
      setSearchResults({});
    } else {
      searchForTrack(searchValue, accessToken);
    }
  }, [searchValue]);

  return (
    // TODO: Create own components
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
      {/* // TODO: Better way of checking if searchResults is empty */}
      {Object.entries(searchResults).length! > 0 && (
        <SearchResults
          topResult={searchResults.topResult}
          artists={searchResults.artists}
          tracks={searchResults.tracks}
        />
      )}
    </div>
  );
};
export default Search;
