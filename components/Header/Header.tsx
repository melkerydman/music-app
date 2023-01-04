import { useEffect, useState } from 'react';
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
  const isFocus = useStore((state) => state.search.isFocus);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // TODO: Maybe hide the Logo and Metronome visually instead of not rendering them?
  return (
    <header
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
