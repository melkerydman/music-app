import Link from 'next/link';
import React from 'react';
import { Heading, Paragraph } from '../Typography/Typography';
import {
  formatDuration,
  handleClassName,
  groupBy,
} from '../../utilities/helpers';

import styles from './TrackList.module.scss';

// TODO! Fetches at most 50 tracks, need to find a way to fetch remaining tracks if there are more than 50 on an album.
// TODO: Update artist link, make the artists comma separated
// TODO: Finish styling - need to make design choices
// TODO: Potentially find a way to stop re-renders when going from a track to a different track but on the same album

const SimpleTrack = ({ item }: { item: SpotifyApi.TrackObjectSimplified }) => (
  <li className={handleClassName([styles.item, styles['item--simple']])}>
    <span
      className={handleClassName([styles['number--simple'], 'p-sm'])}
    >{`${item.track_number}.`}</span>
    <Link href={`/${item.type}/${item.id}`}>
      <a>
        <Heading as="h6" className="p-sm">
          {item.name}
        </Heading>
      </a>
    </Link>
  </li>
);
const Track = ({ item }: { item: SpotifyApi.TrackObjectSimplified }) => (
  <li className={styles.item}>
    <span
      className={handleClassName([styles.number, 'p'])}
    >{`${item.track_number}.`}</span>
    <div className={styles.track}>
      <Link href={`/${item.type}/${item.id}`}>
        <a>
          <Heading weight="normal" className="p" as="h6">
            {item.name}
          </Heading>
        </a>
      </Link>
      <Paragraph as="div" className={'p-xs'}>
        {item.artists.map((artist, index) => (
          <Link key={index} href={`/${artist.type}/${artist.id}`}>
            <a>{artist.name}</a>
          </Link>
        ))}
      </Paragraph>
    </div>
    <span className="p">{formatDuration(item.duration_ms)}</span>
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
      <div
        className={handleClassName([
          styles.outer,
          simple ? styles['outer--simple'] : '',
        ])}
      >
        <Heading as="h3" className={handleClassName([simple ? 'h6' : ''])}>
          <Link href={`/${album.type}/${album.id}`}>
            {simple ? <a>{album.name}</a> : 'Tracklist'}
          </Link>
        </Heading>
        <Paragraph
          sans
          weight="thin"
          as="div"
          className={handleClassName([
            'p',
            styles['sub-heading'],
            simple ? 'p-sm' : '',
          ])}
        >
          {releaseDate.getFullYear()} • {tracks.length} tracks
        </Paragraph>
      </div>
      {discs.map((disc, index) => (
        <section key={index} className={styles['disc-section']}>
          {discs.length > 1 && (
            <Heading className={handleClassName([simple ? 'p' : ''])} as="h6">
              Disc {index + 1}
            </Heading>
          )}
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
