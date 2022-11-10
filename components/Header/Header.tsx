import { handleClassName } from '../../utilities/helpers';
import Logo from '../Logo/Logo';
import Metronome from '../Metronome/Metronome';
import Search from '../Search/Search';

import styles from './Header.module.scss';

type Props = {
  className?: string;
};

const Header = ({ className }: Props): JSX.Element => (
  <div
    className={handleClassName([
      'container',
      styles.header_container,
      className,
    ])}
  >
    {/* <div className={`container ${styles.header_container}`}> */}
    <div className={`flex ${styles.header_search}`}>
      <Logo />
      <Search />
    </div>
    <Metronome />
  </div>
);
export default Header;
