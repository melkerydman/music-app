type TypographyType = {
  className?: string;
  children?: React.ReactNode;
};

type DisplayType = {
  as: 'h1' | 'h2';
};

export const Display = ({
  as,
  className,
  children,
  ...rest
}: TypographyType & DisplayType): JSX.Element => {
  const Component = as;

  return (
    <Component className={className} {...rest}>
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
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

type ParagraphType = {
  as: 'p' | 'span';
};

export const Paragraph = ({
  as,
  className,
  children,
  ...rest
}: TypographyType & ParagraphType): JSX.Element => {
  const Component = as;

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};
