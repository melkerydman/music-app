import React, { useEffect, useRef } from 'react';
import useStore from '../../../store/useStore';

import styles from './SearchInput.module.scss';

const SearchInput = () => {
  const search = useStore((state) => state.search.search);
  const setSearch = useStore((state) => state.search.setSearch);
  const isFocus = useStore((state) => state.search.isFocus);
  const setIsFocus = useStore((state) => state.search.setIsFocus);

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
    <>
      <input
        className={styles.search_input}
        id="search"
        name="search"
        type="text"
        placeholder="Search for artist, song or album"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocus(true)}
      />
      {/* // TODO: is search !== "" needed below? */}
      {search !== '' && isFocus && (
        <div ref={overlayRef} className={styles.overlay} />
      )}
    </>
  );
};

export default SearchInput;
