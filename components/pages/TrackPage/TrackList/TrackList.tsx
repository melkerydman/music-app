import Link from 'next/link';
import type { Album as AlbumType } from '../../../../types';
import { handleClassName } from '../../../../utilities/helpers';
import { Paragraph } from '../../../Typography/Typography';
import styles from './TrackList.module.scss';

type Props = {
  activeId: string;
  album: AlbumType;
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

const TrackList = ({ activeId, album }: Props) => {
  return (
    <div>
      <Paragraph as="div" sans small weight="bold">
        [ Tracklist ]
      </Paragraph>
      <div className={styles['tracks']}>
        {album.tracks.items.map((track, index) => (
          <Paragraph
            as="div"
            small
            weight="thin"
            sans
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
          </Paragraph>
        ))}
      </div>
    </div>
  );
};
export default TrackList;
