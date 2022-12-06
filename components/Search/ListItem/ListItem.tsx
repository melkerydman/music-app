import Image from 'next/future/image';
import Link from 'next/link';
import useStore from '../../../store/useStore';
import { Heading } from '../../Typography/Typography';

import styles from './ListItem.module.scss';

// TODO: Create real types somewhere?

type QuickSearchType = {
  image: string;
  heading: string;
  subHeading?: string[];
  type: string;
  id: string;
};

type Props = {
  content: QuickSearchType;
};

const ListItem = ({ content }: Props): JSX.Element => {
  // if (!content) return;
  const { image, heading, subHeading, type, id } = content;

  const setSearch = useStore((state) => state.search.setSearch);

  return (
    <li onClick={() => setSearch('')}>
      {/* TODO: add proper href */}
      <Link href={`/${type}/${id}`}>
        <a className={styles['list-item']}>
          <Image width="44" height="44" src={image} alt={heading} />
          <div className={styles.text}>
            <Heading className={styles.heading} as="h5">
              {heading}
            </Heading>
            {subHeading && (
              <Heading className={styles['sub-heading']} as="h6">
                {subHeading.join(', ')}
              </Heading>
            )}
          </div>
          <div className={type}>{type} icon</div>
        </a>
      </Link>
    </li>
  );
};

export default ListItem;
