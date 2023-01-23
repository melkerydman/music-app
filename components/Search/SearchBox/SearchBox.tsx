import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useStore from '../../../store/useStore';
import { handleClassName } from '../../../utilities/helpers';
import { useWindowDimensions } from '../../../utilities/hooks';

import styles from './SearchBox.module.scss';

type Props = {
  active?: boolean;
  className?: string;
};

const SearchBox = ({ active, className, ...rest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(false);

  const search = useStore((state) => state.search.search);
  const setSearch = useStore((state) => state.search.setSearch);
  const isFocus = useStore((state) => state.search.isFocus);
  const setIsFocus = useStore((state) => state.search.setIsFocus);

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  useEffect(() => {
    if (active) {
      inputRef?.current?.focus();
    }
  }, [active]);

  return (
    <div className={handleClassName([styles.wrapper, className && className])}>
      <button
        className={handleClassName([styles.icon, isFocus && styles.focus])}
        onClick={() => setIsFocus(true)}
      >
        {<SearchIcon fontSize="large" />}
      </button>
      <input
        className={handleClassName([
          styles.input,
          isMobile && !isFocus && 'hidden',
          isFocus && styles.focus,
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
        className={handleClassName([styles.icon, !isFocus && 'hidden'])}
        onClick={() => {
          setIsFocus(false);
        }}
      >
        <CloseIcon fontSize="large" />
      </button>
    </div>
  );
};

export default SearchBox;
