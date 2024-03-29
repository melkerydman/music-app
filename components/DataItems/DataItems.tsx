import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { handleClassName } from '../../utilities/helpers';
import { Heading, Paragraph } from '../Typography/Typography';
import styles from './DataItems.module.scss';

type DataItemType = {
  title: string;
  value: string;
  description?: string;
  className?: string;
};

interface Props {
  title?: string;
  items: DataItemType[];
}

const DataItem = ({ title, value, description, className }: DataItemType) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className={handleClassName([styles.item, 'p', className || ''])}>
      <div className={handleClassName([styles['item-top']])}>
        <dt className={handleClassName([styles['item-key']])}>{title}</dt>
        <dd className={handleClassName([styles['item-value']])}>{value}</dd>
        {description && (
          <button
            className={styles.button}
            onClick={() => {
              setShowDescription((prev) => !prev);
            }}
          >
            {showDescription ? (
              <RemoveIcon className={styles.remove} fontSize="large" />
            ) : (
              <AddIcon className={styles.add} fontSize="large" />
            )}
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
    {title && (
      <Heading as="h5" className={styles.title}>
        {title}
      </Heading>
    )}

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
