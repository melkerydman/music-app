import { useEffect, useRef, useState } from 'react';

import styles from './Search.module.scss';
import SearchResults from './SearchResults/SearchResults';

import { getTokenClient } from '../../utilities/services/spotify';
import useStore from '../../store/useStore';
import searchSpotify from '../../utilities/services/spotify/searchSpotify';

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
  id: string;
};

const Search = () => {
  const [accessToken, setAccessToken] = useState('');
  const search = useStore((state) => state.search.search);
  const setSearch = useStore((state) => state.search.setSearch);
  const isFocus = useStore((state) => state.search.isFocus);
  const setIsFocus = useStore((state) => state.search.setIsFocus);
  const searchResultsFromStore = useStore(
    (state) => state.search.searchResults
  );
  const setSearchResultsInStore = useStore(
    (state) => state.search.setSearchResults
  );

  const inputRef = useRef(null);

  // TODO: handle access token storage (on server, cookie?)
  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenClient();
      setAccessToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (search === '') {
      return setSearchResultsInStore({
        topResult: {},
        albums: { items: [], next: '' },
        artists: { items: [], next: '' },
        tracks: { items: [], next: '' },
      });
    }

    const searchTimeout = setTimeout(async () => {
      try {
        const searchResultsFromSpotify = await searchSpotify(
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

  // TODO: Create reusable hook for adding overlay?
  // TODO: Add the eventlistener to the ref instead of the entire body
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closeSearch = (e) => {
      if (e.target === overlayRef.current) {
        setIsFocus(false);
      }
    };
    document.body.addEventListener('click', closeSearch);

    return () => document.body.removeEventListener('click', closeSearch);
  }, [setIsFocus]);

  return (
    // TODO: Create own components
    <div className={styles.search}>
      <input
        ref={inputRef}
        className={styles.search_input}
        id="search"
        name="search"
        type="text"
        placeholder="Search for artist, song or album"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocus(true)}
        // onBlur={() => setTimeout(() => setIsFocus(false), 100)}
      />
      {/* // TODO: Better way of checking if searchResults is empty */}
      {search !== '' &&
        isFocus &&
        Object.entries(searchResultsFromStore).length! > 0 && (
          <>
            <SearchResults />
          </>
        )}
      {search !== '' && isFocus && (
        <div ref={overlayRef} className={styles.overlay} />
      )}
    </div>
  );
};
export default Search;
