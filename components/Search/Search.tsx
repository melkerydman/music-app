import { useEffect, useRef, useState } from 'react';

import styles from './Search.module.scss';
import SearchResults from './SearchResults/SearchResults';

import quickSearch from '../../utilities/services/spotify/quickSearch';
import { getTokenClient } from '../../utilities/services/spotify';
import { useSearchContext } from '../../store/useSearch';
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
  const search = useStore((state) => state.search);
  const setSearch = useStore((state) => state.setSearch);

  // const { search: query, setSearch } = useSearchContext();

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

  return (
    // TODO: Create own components
    // <div ref={modalRef} className={styles.search}>
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
      />
      {/* // TODO: Better way of checking if searchResults is empty */}
      {search !== '' && Object.entries(searchResults).length! > 0 && (
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
