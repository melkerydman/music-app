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

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // TODO: Remove from here...
  const headerRef = useRef<HTMLDivElement>(null);
  const originalY = useRef(0);

  // const handleFocus = () => {
  //   console.log('handleFocus() 🔴');
  //   if (headerRef.current) {
  //     originalY.current = window.pageYOffset;
  //     const inputRect = headerRef.current.getBoundingClientRect();
  //     window.scrollTo(0, inputRect.top + window.pageYOffset);
  //   }
  // };

  const handleResize = () => {
    console.log('handleResize() 🔴');
    if (originalY.current !== 0) {
      window.scrollTo(0, originalY.current);
      originalY.current = 0;
    }
  };

  const handleScroll = () => {
    console.log(' 🔴', window.scrollY);
    console.log('isMobile 🔴', isMobile);
    if (headerRef.current && isMobile) {
      console.log('active 🟢', window.scrollY.toString());

      headerRef.current.style.top = `${window.scrollY.toString()}px`;
      headerRef.current.style.backgroundColor = 'blue';
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);
  // TODO: ... to here if doesn't fix viewport height issue on mobile when keyboard opens. As well as handleFocus in onFocus in input element

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
