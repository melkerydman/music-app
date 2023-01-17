import Link from 'next/link';
import React from 'react';
import { Heading, Paragraph } from '../Typography/Typography';
import {
  formatDuration,
  handleClassName,
  groupBy,
} from '../../utilities/helpers';

import styles from './TrackList.module.scss';

// TODO: Update artist link, make the artists comma separated
// TODO: Finish styling - need to make design choices
// TODO: Potentially find a way to stop re-renders when going from a track to a different track but on the same album

const SimpleTrack = ({ item }: { item: SpotifyApi.TrackObjectSimplified }) => (
  <li className={handleClassName([styles.item, styles['item--simple']])}>
    <span className={styles['number--simple']}>{`${item.track_number}.`}</span>
    <Link href={`/${item.type}/${item.id}`}>
      <a>
        <Heading as="h6" className={styles.heading}>
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
          <Heading as="h6">{item.name}</Heading>
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
  album: SpotifyApi.AlbumObjectFull;
  tracks: SpotifyApi.TrackObjectSimplified[];
  className?: string;
  simple?: boolean;
}

const TrackList = React.memo(({ album, tracks, className, simple }: Props) => {
  const discs = groupBy(tracks, 'disc_number');
  const releaseDate = new Date(album.release_date);

  return (
    <div className={className}>
      <div className={styles.outer}>
        <Heading as="h5" className={styles.title}>
          <Link href={`/${album.type}/${album.id}`}>
            <a>{album.name}</a>
          </Link>
        </Heading>
        <Paragraph sans weight="thin" as="div">
          {releaseDate.getFullYear()} - {tracks.length} tracks
        </Paragraph>
      </div>
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
