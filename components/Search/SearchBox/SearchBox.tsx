import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../../store/useStore';
import { handleClassName } from '../../../utilities/helpers';

import styles from './SearchBox.module.scss';

type Props = {
  active?: boolean;
  className?: string;
};

const SearchBox = ({ active, className, ...rest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const search = useStore((state) => state.search.search);
  const setSearch = useStore((state) => state.search.setSearch);
  const isFocus = useStore((state) => state.search.isFocus);
  const setIsFocus = useStore((state) => state.search.setIsFocus);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (active) {
      inputRef?.current?.focus();
    }
  }, [active]);

  return (
    <div className={handleClassName([styles.wrapper, className && className])}>
      <button onClick={() => setIsFocus(true)}>🔦</button>
      <input
        className={handleClassName([
          styles.input,
          isMobile && !isFocus && 'hidden',
        ])}
        id="search"
        ref={inputRef}
        name="search"
        type="text"
        placeholder="Search for artist, song or album"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => {
          setIsFocus(true);
        }}
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

export default SearchBox;
