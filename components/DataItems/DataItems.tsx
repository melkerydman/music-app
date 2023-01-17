import { handleClassName } from '../../utilities/helpers';
import { Paragraph } from '../Typography/Typography';
import styles from './DataItems.module.scss';

type DataItemType = {
  title: string;
  value: string;
  description?: string;
};

interface Props {
  items: DataItemType[];
}

const DataItem = ({ title, value, description }: DataItemType) => (
  <div className={handleClassName([styles.text])}>
    <div>
      <dt className={handleClassName([styles.heading])}>{title}</dt>
      <dd>{value}</dd>
      {description && <button>show more</button>}
    </div>
    {description && (
      <Paragraph sans as="p">
        {description}
      </Paragraph>
    )}
  </div>
);

const DataItems = ({ items }: Props): JSX.Element => (
  <dl>
    {items.map((item, index) => (
      <DataItem
        key={index}
        title={item.title}
        value={item.value}
        description={item.description}
      />
    ))}
  </dl>
);
export default DataItems;
