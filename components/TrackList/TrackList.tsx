import Link from 'next/link';
import { Heading } from '../Typography/Typography';
import { formatDuration, handleClassName } from '../../utilities/helpers';

import styles from './TrackList.module.scss';

// TODO: Update artist link, make the artists comma separated
// TODO: Finish styling - need to make design choices

const SimpleTrack = ({ item }: { item: SpotifyApi.TrackObjectSimplified }) => (
  <li className={handleClassName([styles.item, styles['item-small']])}>
    <span className={styles['number--small']}>{`${item.track_number}.`}</span>
    <Link href={`/${item.type}/${item.id}`}>
      <a>
        <Heading as="h6" className={styles['heading-small']}>
          {item.name}
        </Heading>
      </a>
    </Link>
  </li>
);
const Track = ({ item }: { item: SpotifyApi.TrackObjectSimplified }) => (
  <li className={styles.item}>
    <span className={styles.number}>{`${item.track_number}.`}</span>
    <span className={styles.arrow} />
    <div>
      <Link href={`/${item.type}/${item.id}`}>
        <a>
          <Heading as="h6" className={styles['']}>
            {item.name}
          </Heading>
        </a>
      </Link>
      <div>
        {item.artists.map((artist, index) => (
          <Link key={index} href={`/${artist.type}/${artist.id}`}>
            <a>{artist.name}</a>
          </Link>
        ))}
      </div>
    </div>
    <span>{formatDuration(item.duration_ms)}</span>
  </li>
);

interface Props {
  tracks: SpotifyApi.TrackObjectSimplified[];
  className?: string;
  simple?: boolean;
}

const TrackList = ({ tracks, className, simple }: Props) => (
  <div className={className}>
    <Heading as="h5" className={styles.title}>
      Tracklist
    </Heading>
    <ul>
      {tracks.map((track, index) => {
        if (simple) return <SimpleTrack key={index} item={track} />;
        return <Track item={track} key={index} />;
      })}
    </ul>
  </div>
);
export default TrackList;
