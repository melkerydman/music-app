import { handleClassName } from '../../utilities/helpers';
import { Heading, Paragraph } from '../Typography/Typography';
import styles from './Grid.module.scss';

interface ItemProps {
  title?: string;
  value?: string;
  description?: string;
}

const Item = ({ title, value, description }: ItemProps) => (
  <div className={handleClassName([styles['grid-item'], styles.text])}>
    <Heading className={handleClassName([styles.heading])} as="h6">
      {title}
    </Heading>
    <Heading as="h4">{value}</Heading>
    <Paragraph as="p">{description}</Paragraph>
  </div>
);

interface Props extends ItemProps {
  container?: boolean;
  item?: boolean;
  children?: React.ReactNode;
}

const Grid = ({
  container,
  item,
  children,
  title,
  value,
  description,
}: Props) => {
  // TODO: Maybe add some error message saying you need to use one or the other and not both
  if (container && item) return null;

  if (container)
    return <div className={handleClassName([styles.grid])}>{children}</div>;
  if (item)
    return <Item title={title} value={value} description={description} />;
  return null;
};
export default Grid;
