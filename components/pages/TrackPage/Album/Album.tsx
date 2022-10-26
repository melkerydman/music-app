import Link from 'next/link';
import type { Album as AlbumType } from '../../../../types';
import { Heading } from '../../../Typography/Typography';
import styles from './Album.module.scss';

type Props = {
  album: AlbumType;
};

const Album = ({ album }: Props) => {
  return (
    <div className={styles['album']}>
      <Heading as="h4">Tracklist</Heading>
      <div className={styles['tracks']}>
        {album.tracks.items.map((track, index) => (
          <div className={styles['track']} key={index}>
            <Link href={`/${track.type}/${track.id}`}>
              <a>
                {track.track_number} / {track.name}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Album;
