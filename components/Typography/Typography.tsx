import { handleClassName } from '../../utilities/helpers';
import styles from './typography.module.scss';

type TypographyType = {
  className?: string;
  children?: React.ReactNode;
  weight?: 'bold' | 'thin';
};

type DisplayType = {
  as?: 'h1' | 'h2';
  small?: boolean;
};

export const Display = ({
  as = 'h1',
  small,
  weight,
  className,
  children,
  ...rest
}: TypographyType & DisplayType): JSX.Element => {
  const Component = as;

  return (
    <Component
      className={handleClassName([
        styles.display,
        small ? styles['display--sm'] : '',
        weight ? styles[weight] : '',
        className || '',
      ])}
      {...rest}
    >
      {children}
    </Component>
  );
};

type HeadingType = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const Heading = ({
  as,
  weight,
  className,
  children,
  ...rest
}: TypographyType & HeadingType): JSX.Element => {
  const Component = as;

  return (
    <Component
      className={handleClassName([
        styles[as],
        weight ? styles[weight] : '',
        className || '',
      ])}
      {...rest}
    >
      {children}
    </Component>
  );
};

type ParagraphType = {
  as?: 'p' | 'span' | 'div';
  small?: boolean;
  sans?: boolean;
};

export const Paragraph = ({
  as = 'p',
  sans,
  small,
  weight,
  className,
  children,
  ...rest
}: TypographyType & ParagraphType): JSX.Element => {
  const Component = as;

  return (
    <Component
      className={handleClassName([
        styles.p,
        className || '',
        sans ? styles.sans : '',
        small ? styles['p--sm'] : '',
        weight ? styles[weight] : '',
      ])}
      {...rest}
    >
      {children}
    </Component>
  );
};
