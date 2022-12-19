import { useEffect, useState } from 'react';

import styles from './Search.module.scss';

import { getTokenClient } from '../../utilities/services/spotify';
import useStore from '../../store/useStore';
import { searchForItem } from '../../utilities/services/spotify/searchSpotify';
import SearchInput from './SearchInput/SearchInput';
import ListItems from './ListItems/ListItems';
// import { useAuthToken } from '../../utilities/hooks';

const Search = () => {
  // const accessToken = useAuthToken();
  const [accessToken, setAccessToken] = useState('');
  const search = useStore((state) => state.search.search);
  const isFocus = useStore((state) => state.search.isFocus);
  const searchResultsFromStore = useStore(
    (state) => state.search.searchResults
  );
  const setSearchResultsInStore = useStore(
    (state) => state.search.setSearchResults
  );

  // TODO: Finish partially created authentication hook
  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenClient();
      setAccessToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (search === '') {
      return setSearchResultsInStore({});
    }

    const searchTimeout = setTimeout(async () => {
      try {
        const searchResultsFromSpotify = await searchForItem(
          accessToken,
          search
        );
        setSearchResultsInStore(searchResultsFromSpotify);
      } catch (err) {
        setAccessToken(await getTokenClient());
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [search, accessToken, setSearchResultsInStore]);

  const SearchResults = () => {
    // TODO: Find a cleaner way of solving this very simple check
    const { albums, artists, tracks } = searchResultsFromStore;
    if (
      albums.items.length === 0 &&
      artists.items.length === 0 &&
      tracks.items.length === 0
    ) {
      return (
        <ul className={styles['search-results']}>
          <li>No results found.</li>
        </ul>
      );
    }

    return (
      <ul className={styles['search-results']}>
        {tracks.items.length > 0 && (
          <ListItems data={tracks.items} type="track" />
        )}
        {artists.items.length > 0 && (
          <ListItems data={artists.items} type="artist" />
        )}
        {albums.items.length > 0 && (
          <ListItems data={albums.items} type="album" />
        )}
      </ul>
    );
  };

  return (
    <div className={styles.search}>
      <SearchInput />

      {/* // TODO: Better way of checking if searchResults is empty */}
      {search !== '' &&
        isFocus &&
        Object.entries(searchResultsFromStore).length! > 0 && <SearchResults />}
    </div>
  );
};
export default Search;
