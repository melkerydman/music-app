import Image from 'next/future/image';
import Link from 'next/link';
import { handleClassName } from '../../../../utilities/helpers';
import { Heading } from '../../../Typography/Typography';
import styles from './MoreAlbums.module.scss';

const Album = ({ album }: { album: SpotifyApi.AlbumObjectFull }) => {
  const { name, images } = album;

  return (
    <li>
      <Link href={`/${album.type}/${album.id}`}>
        <a className="flex">
          <div className={styles.album__outer}>
            {images[0]?.url && (
              <Image
                src={images[0].url}
                alt={name}
                height="48"
                width="48"
                className={styles.album__inner}
              />
            )}
          </div>

          <Heading className={styles.album__heading} weight="thin" as="h6">
            {name}
          </Heading>
        </a>
      </Link>
    </li>
  );
};
interface Props {
  albums: SpotifyApi.AlbumObjectFull[];
  activeAlbumId: string;
  className?: string;
}

const MoreAlbums = ({ albums, className, activeAlbumId }: Props) => (
  <div className={handleClassName([className, styles['more-albums']])}>
    <Heading className={styles.heading} as="h5">
      More albums from artist
    </Heading>
    <ul className={styles['more-albums__inner']}>
      {albums.map((album, index) => {
        if (activeAlbumId === album.id) return null;
        return <Album key={index} album={album} />;
      })}
    </ul>
  </div>
);
export default MoreAlbums;
