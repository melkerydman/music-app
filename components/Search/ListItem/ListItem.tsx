import Image from 'next/future/image';
import { Heading } from '../../Typography/Typography';

import styles from './ListItem.module.scss';

// TODO: Create real types somewhere

type QuickSearchType = {
  href: string;
  image: string;
  heading: string;
  subHeading?: string[];
  type: string;
};

type Props = {
  content: QuickSearchType;
};

const ListItem = ({ content }: Props) => {
  if (!content) return;
  const { href, image, heading, subHeading, type } = content;

  return (
    <li className={styles['list-item']}>
      <Image width="44" height="44" src={image} alt={heading} />
      <div className={styles['flex']}>
        <Heading className={styles['heading']} as="h5">
          {heading}
        </Heading>
        {subHeading && (
          <Heading className={styles['sub-heading']} as="h6">
            {subHeading.join(', ')}
          </Heading>
        )}
      </div>
      <div className={type}>{type} icon</div>
    </li>
  );
};

export default ListItem;
