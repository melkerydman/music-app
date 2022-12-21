import Image from 'next/future/image';
import { Heading } from '../../Typography/Typography';
import styles from './PageHeader.module.scss';

interface Props {
  image: SpotifyApi.ImageObject;
  heading: string;
  subHeading: string;
}

const PageHeader = ({ image, heading, subHeading }: Props) => {
  const { url: imageUrl } = image;

  return (
    <header className={styles.header}>
      <div className={styles['image-wrapper']}>
        <Image
          src={imageUrl}
          alt={heading}
          className={styles.image}
          sizes="100vw"
          fill
        />
      </div>
      <div className={styles.titles}>
        <Heading as="h4">{subHeading}</Heading>
        <Heading as="h1">{heading}</Heading>
      </div>
    </header>
  );
};

export default PageHeader;
