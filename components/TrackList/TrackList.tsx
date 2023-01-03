import Link from 'next/link';
import React from 'react';
import { Heading } from '../Typography/Typography';
import {
  formatDuration,
  handleClassName,
  groupBy,
} from '../../utilities/helpers';

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

const TrackList = React.memo(({ tracks, className, simple }: Props) => {
  const discs = groupBy(tracks, 'disc_number');

  return (
    <div className={className}>
      <Heading as="h5" className={styles.title}>
        Tracklist
      </Heading>
      {discs.map((disc, index) => (
        <section key={index}>
          {discs.length > 1 && <h3>Disc {index + 1}</h3>}
          <ul>
            {disc.map((track, trackIndex) => {
              if (simple) return <SimpleTrack key={trackIndex} item={track} />;
              return <Track item={track} key={trackIndex} />;
            })}
          </ul>
        </section>
      ))}
    </div>
  );
});

TrackList.displayName = 'TrackList';

export default TrackList;
