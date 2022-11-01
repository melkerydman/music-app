import Link from 'next/link';
import type { Album as AlbumType } from '../../../../types';
import { handleClassName } from '../../../../utilities/helpers';
import { Heading, Paragraph } from '../../../Typography/Typography';
import styles from './Album.module.scss';

type Props = {
  activeId: string;
  album: AlbumType;
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

const Album = ({ activeId, album }: Props) => {
  // TODO: Look through all of this, break out to classes as well as create global classes to use
  return (
    <div>
      <div className={handleClassName([styles['info']])}>
        <div className={handleClassName([styles['info--left']])}>
          <Paragraph small sans weight="bold" as="div">
            [ Album ]
          </Paragraph>
          <Paragraph small sans weight="thin" as="div">
            {album.name}
          </Paragraph>
        </div>
        <div className={handleClassName([styles['info--right']])}>
          <Paragraph small sans weight="bold" as="div">
            [ Year ]
          </Paragraph>
          <Paragraph small sans weight="thin" as="div">
            2004
          </Paragraph>
        </div>
      </div>

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
    </div>
  );
};
export default Album;
