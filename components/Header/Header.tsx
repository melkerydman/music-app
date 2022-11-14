import { handleClassName } from '../../utilities/helpers';
import Logo from '../Logo/Logo';
import Metronome from '../Metronome/Metronome';
import Search from '../Search/Search';

import styles from './Header.module.scss';

type Props = {
  className?: string;
};

const Header = ({ className }: Props): JSX.Element => (
  <div className={handleClassName(['container', styles.container, className])}>
    {/* <div className={`container ${styles.header_container}`}> */}
    <div className={`flex ${styles.search}`}>
      <Logo />
      <Search />
    </div>
    <Metronome />
  </div>
);
export default Header;
