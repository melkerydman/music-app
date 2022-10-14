import { useEffect, useState } from 'react';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';

import styles from './Search.module.scss';
import SearchResults from './SearchResults/SearchResults';

// TODO: Create real types somewhere
type QuickSearchResultsType = {
  topResult?: QuickSearchType;
  albums?: QuickSearchType[];
  artists?: QuickSearchType[];
  tracks?: QuickSearchType[];
};

type QuickSearchType = {
  href: string;
  image: string;
  heading: string;
  subHeading?: string[];
  type: string;
};

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<QuickSearchResultsType>(
    {}
  );
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
      // TODO: Validate response
      await fetch(url, { headers })
        .then((response) => response.json())
        .then((data) => {
          const maxTracks = 7;
          const maxArtists = 3;
          const maxAlbums = 3;

          let tracks = [];
          if (data.tracks.items.length > 0) {
            tracks = data.tracks.items.slice(0, maxTracks).map((track) => {
              return {
                href: track.href,
                heading: track.name,
                subHeading: track.artists.map((artist) => artist.name),
                image: track.album.images[2].url,
                type: track.type,
              };
            });
          }
          let artists = [];
          if (data.artists.items.length > 0) {
            artists = data.artists.items.slice(0, maxArtists).map((artist) => {
              return {
                href: artist.href,
                heading: artist.name,
                image: artist.images[2]?.url,
                type: artist.type,
              };
            });
          }

          let albums = [];
          if (data.albums.items.length > 0) {
            albums = data.albums.items.slice(0, maxAlbums).map((album) => {
              return {
                href: album.href,
                heading: album.name,
                subHeading: album.artists.map((artist) => artist.name),
                image: album.images[2].url,
                type: album.type,
              };
            });
          }

          // TODO: Make sure this actually works
          let topResult = tracks[0] || artists[0] || albums[0];

          setSearchResults({ topResult, tracks, artists, albums });
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
          albums={searchResults.albums}
        />
      )}
    </div>
  );
};
export default Search;
