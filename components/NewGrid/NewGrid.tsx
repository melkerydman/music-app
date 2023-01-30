import { handleClassName } from '../../utilities/helpers';
import styles from './NewGrid.module.scss';

type Sizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridItemProps {
  span?: Sizes;
  xs?: Sizes;
  sm?: Sizes;
  md?: Sizes;
  lg?: Sizes;
  xl?: Sizes;
  className?: string;
  children?: React.ReactNode;
}

const Item = ({
  children,
  className,
  span,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}: GridItemProps) => (
  <div
    className={handleClassName([
      'grid-item',
      span && `grid-item__${span}`,
      xs && `grid-item__${xs}:xs`,
      sm && `grid-item__${sm}:sm`,
      md && `grid-item__${md}:md`,
      lg && `grid-item__${lg}:lg`,
      xl && `grid-item__${xl}:xl`,
      className && className,
    ])}
    {...rest}
  >
    {children}
  </div>
);

interface GridProps extends GridItemProps {
  as?: 'div' | 'main';
  container?: boolean;
  item?: boolean;
  fullBorder?: boolean;
}

const Grid = ({
  as = 'div',
  container,
  item,
  fullBorder,
  span,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  children,
  ...rest
}: GridProps) => {
  // TODO: Maybe add some error message saying you need to use one or the other and not both
  if (container && item) return null;

  const Component = as;

  if (container)
    return (
      <Component
        className={handleClassName([
          'grid',
          styles.container,
          className && className,
          fullBorder && styles['full-border'],
        ])}
        {...rest}
      >
        {children}
      </Component>
    );
  if (item)
    return (
      <Item
        className={handleClassName([className && className, styles.item])}
        span={span}
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
      >
        {children}
      </Item>
    );
  return null;
};
export default Grid;
