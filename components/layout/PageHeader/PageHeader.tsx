import Image from 'next/future/image';
import { Heading } from '../../Typography/Typography';
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
    // <header className={styles.header}>
    <header>
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
          <Heading as="h4">{subHeading}</Heading>
          <Heading as="h1">{heading}</Heading>
        </NewGrid>
      </NewGrid>
    </header>
  );
};

export default PageHeader;
