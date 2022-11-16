import { useEffect, useState } from 'react';

import styles from './Search.module.scss';
import SearchResults from './SearchResults/SearchResults';

import quickSearch from '../../utilities/services/spotify/quickSearch';
import { getTokenClient } from '../../utilities/helpers/getToken';
import useSearchStore from '../../store/useStore';

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

  const isSearching = useSearchStore((state) => state.isSearching);
  const setIsSearching = useSearchStore((state) => state.setIsSearching);
  const searchString = useSearchStore((state) => state.searchString);
  const setSearchString = useSearchStore((state) => state.setSearchString);

  // TODO: handle access token storage (on server, cookie?)
  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenClient();
      setAccessToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (!accessToken || searchString === '') {
      setIsSearching(false);
      return setSearchResults({});
    }

    // TODO: Naming convention for async function?
    const search = async () => {
      try {
        const searchResult = await quickSearch(searchString, accessToken);
        setSearchResults(searchResult);
        if (!isSearching) setIsSearching(true);
      } catch {
        setAccessToken(await getTokenClient());
        search();
      }
    };

    search();
    return undefined;

    // TODO: Look at this dependency array - can it be made smaller or is this fine?
    // https://dev.to/wkrueger/never-ignore-the-exhaustive-deps-rule-2ap8
  }, [searchString, accessToken, isSearching, setIsSearching]);

  return (
    // TODO: Create own components
    <div className={styles.search}>
      <input
        className={styles.search_input}
        id="search"
        name="search"
        type="text"
        placeholder="Search for artist, song or album"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      {/* // TODO: Better way of checking if searchResults is empty */}
      {/* {Object.entries(searchResults).length! > 0 && ( */}
      {isSearching && Object.entries(searchResults).length! > 0 && (
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
