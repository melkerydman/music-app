import { useEffect, useRef, useState } from 'react';

import styles from './Search.module.scss';
import SearchResults from './SearchResults/SearchResults';

import quickSearch from '../../utilities/services/spotify/quickSearch';
import { getTokenClient } from '../../utilities/services/spotify';
import useStore from '../../store/useStore';

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
  const [searchResults, setSearchResults] = useState<QuickSearchResultsType>(
    {}
  );

  const [accessToken, setAccessToken] = useState('');
  const search = useStore((state) => state.search.search);
  const setSearch = useStore((state) => state.search.setSearch);
  const isFocus = useStore((state) => state.search.isFocus);
  const setIsFocus = useStore((state) => state.search.setIsFocus);
  // const searchResultsFromStore = useStore(
  //   (state) => state.search.searchResults
  // );
  // const setSearchResultsInStore = useStore(
  //   (state) => state.search.setSearchResults
  // );

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
      return setSearchResults({});
    }

    const searchTimeout = setTimeout(async () => {
      try {
        const searchResult = await quickSearch(search, accessToken);
        setSearchResults(searchResult);
      } catch (err) {
        setAccessToken(await getTokenClient());
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [search, accessToken]);

  // useEffect(() => {
  //   setSearchResultsInStore(searchResults);
  // }, [searchResults, setSearchResultsInStore]);

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
        onBlur={() => setTimeout(() => setIsFocus(false), 100)}
      />
      {/* // TODO: Better way of checking if searchResults is empty */}
      {search !== '' && isFocus && Object.entries(searchResults).length! > 0 && (
        <>
          <SearchResults
            topResult={searchResults.topResult}
            artists={searchResults.artists}
            tracks={searchResults.tracks}
            albums={searchResults.albums}
          />
        </>
      )}
    </div>
  );
};
export default Search;
