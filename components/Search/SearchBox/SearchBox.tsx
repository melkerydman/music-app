import React, { useEffect, useRef } from 'react';
import useStore from '../../../store/useStore';
import { handleClassName } from '../../../utilities/helpers';

import styles from './SearchBox.module.scss';

type Props = {
  active?: boolean;
  className?: string;
};

const SearchBox = ({ active, className, ...rest }: Props) => {
  const inputRef = useRef(null);

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

  useEffect(() => {
    if (active) {
      inputRef?.current?.focus();
    }
  }, [active]);

  return (
    <div className={handleClassName([styles.wrapper, className && className])}>
      <button>icon</button>
      <input
        className={handleClassName([styles.input])}
        id="search"
        ref={inputRef}
        name="search"
        type="text"
        placeholder="Search for artist, song or album"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocus(true)}
        {...rest}
      />
      <button
        className={handleClassName([!isFocus && 'hidden'])}
        onClick={() => {
          setIsFocus(false);
        }}
      >
        X
      </button>
    </div>
  );
};
// {isFocus && <div ref={overlayRef} className={styles.overlay} />}

export default SearchBox;
