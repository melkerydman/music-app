import Image from 'next/future/image';
import { Display, Heading } from '../../Typography/Typography';
import styles from './PageHeader.module.scss';
import NewGrid from '../../NewGrid/NewGrid';

interface Props {
  image: SpotifyApi.ImageObject;
  heading: string;
  subHeading: string;
}

const PageHeader = ({ image, heading, subHeading }: Props) => {
  const { url } = image;

  return (
    <header className={styles.header}>
      <NewGrid container>
        <NewGrid item sm={3}>
          <div className={styles['image-wrapper']}>
            <Image
              src={url}
              alt={heading}
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw,
              25vw"
              priority
            />
          </div>
        </NewGrid>
        <NewGrid item sm={9} className={styles.titles}>
          <Heading className={styles.titles__sub} as="h4">
            {subHeading}
          </Heading>
          <Display className={styles.titles__main} small as="h1">
            {heading}
          </Display>
        </NewGrid>
      </NewGrid>
    </header>
  );
};

export default PageHeader;
