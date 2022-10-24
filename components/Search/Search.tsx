import { useEffect, useState } from 'react';

import styles from './Search.module.scss';
import SearchResults from './SearchResults/SearchResults';

import quickSearch from '../../utilities/services/spotify/quickSearch';
import { getTokenClient } from '../../utilities/helpers/getToken';

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
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<QuickSearchResultsType>(
    {}
  );
  const [accessToken, setAccessToken] = useState('');

  // TODO: handle access token storage (on server, cookie?)
  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenClient();
      setAccessToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (!accessToken || searchValue === '') return setSearchResults({});

    // TODO: Naming convention for async function?
    const search = async () => {
      try {
        const searchResult = await quickSearch(searchValue, accessToken);
        setSearchResults(searchResult);
      } catch {
        setAccessToken(await getTokenClient());
      }
    };

    search();
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
