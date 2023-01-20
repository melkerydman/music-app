import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import useStore from '../../store/useStore';
import { handleClassName } from '../../utilities/helpers';
import Logo from '../Logo/Logo';
import Metronome from '../Metronome/Metronome';
import Search from '../Search/Search';
import { useWindowDimensions } from '../../utilities/hooks';

import styles from './Header.module.scss';

type Props = {
  className?: string;
  containerClassName?: string;
};

const Header = ({ className, containerClassName }: Props): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const isFocus = useStore((state) => state.search.isFocus);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScroll]);

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  // TODO: Potentially use headerRef for fixing search bar issue on mobile, otherwise remove.
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile && isFocus) {
      setKeyboardActive(true);
    } else {
      setKeyboardActive(false);
    }
  }, [isMobile, isFocus]);

  useEffect(() => {
    if (keyboardActive) {
      console.log('keyboard active 🟢');
      // What do I want to do if keyboard is active?
      // handleFocus();
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
        keyboardActive ? styles['keyboard-active'] : '',
        isScroll ? styles.shadow : '',
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
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
            <Search />
            <Metronome />
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
