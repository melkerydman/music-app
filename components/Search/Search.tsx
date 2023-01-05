import React, { useEffect, useState } from 'react';

import styles from './Search.module.scss';

import { getTokenClient } from '../../utilities/services/spotify';
import useStore from '../../store/useStore';
import { searchForItem } from '../../utilities/services/spotify/searchSpotify';
import SearchBox from './SearchBox/SearchBox';
import ListItems from './ListItems/ListItems';
import { handleClassName } from '../../utilities/helpers';
import Modal from '../Modal/Modal';
// import { useAuthToken } from '../../utilities/hooks';

const Search = () => {
  // const accessToken = useAuthToken();
  const [accessToken, setAccessToken] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const search = useStore((state) => state.search.search);
  const isFocus = useStore((state) => state.search.isFocus);
  const setIsFocus = useStore((state) => state.search.setIsFocus);
  const searchResultsFromStore = useStore(
    (state) => state.search.searchResults
  );
  const setSearchResultsInStore = useStore(
    (state) => state.search.setSearchResults
  );

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

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
    const { albums, artists, tracks } = searchResultsFromStore;
    const noResults =
      !albums?.items.length && !artists?.items.length && !tracks?.items.length;

    return (
      <ul className={styles['search-results']}>
        {noResults ? (
          <li>No results found.</li>
        ) : (
          <>
            {tracks?.items.length > 0 && (
              <ListItems data={tracks.items} type="track" />
            )}
            {artists?.items.length > 0 && (
              <ListItems data={artists.items} type="artist" />
            )}
            {albums?.items.length > 0 && (
              <ListItems data={albums.items} type="album" />
            )}
          </>
        )}
      </ul>
    );
  };

  return (
    <div className={handleClassName([styles.search])}>
      {!isFocus && <SearchBox />}
      {isFocus && isMobile && (
        <>
          <SearchBox active />
          <Modal
            isOpen={isFocus}
            onClose={() => {
              setIsFocus(false);
            }}
            className={styles.modal}
          >
            {search !== '' &&
              Object.entries(searchResultsFromStore).length! > 0 && (
                <SearchResults />
              )}
          </Modal>
        </>
      )}
      {isFocus && !isMobile && (
        <>
          <SearchBox active />
          <Modal
            isOpen={isFocus}
            onClose={() => {
              setIsFocus(false);
            }}
            className={styles.modal}
          >
            {search !== '' &&
              Object.entries(searchResultsFromStore).length! > 0 && (
                <SearchResults />
              )}
          </Modal>
        </>
      )}
    </div>
  );
};
export default Search;
