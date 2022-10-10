import { useState } from 'react';

import styles from './Search.module.scss';

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState([]);

  return (
    <>
      <input
        className={styles['search_input']}
        id="search"
        name="search"
        type="text"
        placeholder="Search for artist, song or album"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </>
  );
};
export default Search;
