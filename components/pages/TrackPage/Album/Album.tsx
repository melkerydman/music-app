import Link from 'next/link';
import type { Album as AlbumType } from '../../../../types';
import { handleClassName } from '../../../../utilities/helpers';
import { Heading } from '../../../Typography/Typography';
import styles from './Album.module.scss';

type Props = {
  activeId: string;
  album: AlbumType;
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

const Album = ({ activeId, album }: Props) => {
  return (
    <div className={styles['album']}>
      <Heading as="h4">Tracklist</Heading>
      <div className={styles['tracks']}>
        {album.tracks.items.map((track, index) => (
          <div
            className={handleClassName([
              styles['track'],
              track.id === activeId ? styles['track--active'] : '',
            ])}
            key={index}
          >
            <Link href={`/${track.type}/${track.id}`}>
              <a>
                {padTo2Digits(track.track_number)} / {track.name}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Album;
