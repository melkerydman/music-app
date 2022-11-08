import { handleClassName } from '../../utilities/helpers';
import styles from './logo.module.scss';

type LogoType = {
  large?: boolean;
};

const Logo = ({ large, ...rest }: LogoType): JSX.Element => (
  <div
    className={handleClassName([styles.logo, large ? styles.logo_lg : ''])}
    {...rest}
  />
);

export default Logo;
