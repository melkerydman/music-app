import { useState } from 'react';
import { handleClassName } from '../../utilities/helpers';
import { Heading, Paragraph } from '../Typography/Typography';
import styles from './DataItems.module.scss';

type DataItemType = {
  title: string;
  value: string;
  description?: string;
};

interface Props {
  title: string;
  items: DataItemType[];
}

const DataItem = ({ title, value, description }: DataItemType) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className={handleClassName([styles.item, 'p'])}>
      <div className={handleClassName([styles['item-top']])}>
        <dt className={handleClassName([styles['item-key']])}>{title}</dt>
        <dd className={handleClassName([styles['item-value']])}>{value}</dd>
        {description && (
          <button
            onClick={() => {
              setShowDescription((prev) => !prev);
            }}
          >
            {showDescription ? '-' : '+'}
          </button>
        )}
      </div>
      {description && showDescription && (
        <Paragraph
          className={handleClassName([styles['item-description']])}
          sans
          as="p"
        >
          {description}
        </Paragraph>
      )}
    </div>
  );
};

const DataItems = ({ title, items }: Props): JSX.Element => (
  <div className={styles['data-items']}>
    <Heading as="h5" className={styles.title}>
      {title}
    </Heading>
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
  </div>
);
export default DataItems;
