import styles from './logo.module.scss';

type LogoType = {
  large?: boolean;
};

const Logo = ({ large, ...rest }: LogoType): JSX.Element => {
  return (
    <div
      className={`${styles.logo} ${large ? styles['logo_lg'] : ''}`}
      {...rest}
    />
  );
};

export default Logo;
