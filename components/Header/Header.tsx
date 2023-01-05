import { useEffect, useRef, useState } from 'react';
import useStore from '../../store/useStore';
import { handleClassName } from '../../utilities/helpers';
import Logo from '../Logo/Logo';
import Metronome from '../Metronome/Metronome';
import Search from '../Search/Search';

import styles from './Header.module.scss';

type Props = {
  className?: string;
  containerClassName?: string;
};

const Header = ({ className, containerClassName }: Props): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const isFocus = useStore((state) => state.search.isFocus);
  // TODO: Remove from here...
  const headerRef = useRef<HTMLDivElement>(null);
  const originalY = useRef(0);

  const handleFocus = () => {
    console.log('handleFocus() 🔴');
    if (headerRef.current) {
      originalY.current = window.pageYOffset;
      const inputRect = headerRef.current.getBoundingClientRect();
      window.scrollTo(0, inputRect.top + window.pageYOffset);
    }
  };

  const handleResize = () => {
    console.log('handleResize() 🔴');
    if (originalY.current !== 0) {
      window.scrollTo(0, originalY.current);
      originalY.current = 0;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // TODO: ... to here if doesn't fix viewport height issue on mobile when keyboard opens. As well as handleFocus in onFocus in input element

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile && isFocus) {
      setKeyboardActive(true);
    } else {
      setKeyboardActive(false);
    }
  }, [isMobile, isFocus]);

  useEffect(() => {
    if (keyboardActive) {
      handleFocus();
    }
  }, [keyboardActive]);

  // TODO: Maybe hide the Logo and Metronome visually instead of not rendering them?
  return (
    <header
      ref={headerRef}
      className={handleClassName([
        styles.header,
        className || '',
        isFocus ? styles['modal-active'] : '',
      ])}
    >
      <div
        className={handleClassName([
          'container',
          styles.container,
          containerClassName || '',
        ])}
      >
        {isFocus && isMobile ? (
          <Search />
        ) : (
          <>
            <Logo />
            <Search />
            <Metronome />
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
