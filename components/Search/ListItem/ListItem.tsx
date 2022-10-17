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
      <img width="24" height="24" src={image} alt={heading} />
      <div className={styles['flex']}>
        <Heading as="h5">{heading}</Heading>
        {subHeading && <Heading as="h6">{subHeading.join(', ')}</Heading>}
      </div>
      <div className={type}>{type} icon</div>
    </li>
  );
};

export default ListItem;
