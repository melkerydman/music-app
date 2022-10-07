import Logo from '../Logo/Logo';
import Metronome from '../Metronome/Metronome';
import Search from '../Search/Search';

import styles from './Header.module.scss';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Header = ({ className, children, ...rest }: Props): JSX.Element => {
  return (
    <div className={`container ${styles['header_container']}`}>
      <div className={`flex ${styles['header_search']}`}>
        <Logo />
        <Search />
      </div>
      <Metronome />
    </div>
  );
};
export default Header;
