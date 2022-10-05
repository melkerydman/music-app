import styles from './typography.module.scss';

type TypographyType = {
  className?: string;
  children?: React.ReactNode;
};

type DisplayType = {
  as: 'h1' | 'h2';
  small?: boolean;
};

export const Display = ({
  as,
  small,
  className = '',
  children,
  ...rest
}: TypographyType & DisplayType): JSX.Element => {
  const Component = as;

  return (
    <Component
      className={`${styles.display} ${small ? styles['display_sm'] : ''} ${
        className ? className : ''
      }`}
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
  className,
  children,
  ...rest
}: TypographyType & HeadingType): JSX.Element => {
  const Component = as;

  return (
    <Component
      className={`${styles[as]} ${className ? className : ''}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

type ParagraphType = {
  as: 'p' | 'span';
  small?: boolean;
};

export const Paragraph = ({
  as,
  small,
  className,
  children,
  ...rest
}: TypographyType & ParagraphType): JSX.Element => {
  const Component = as;

  return (
    <Component
      className={`${styles.p} ${small ? styles['p_sm'] : ''} ${
        className ? className : ''
      }`}
      {...rest}
    >
      {children}
    </Component>
  );
};
