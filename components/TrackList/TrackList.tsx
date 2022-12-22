import Link from 'next/link';
import { Heading } from '../Typography/Typography';
import { formatDuration } from '../../utilities/helpers';

// import styles from './TrackList.module.scss';

const Track = ({ item }: { item: SpotifyApi.TrackObjectSimplified }) => (
  <li style={{ display: 'flex' }}>
    <Heading as="h6">{item.track_number}</Heading>
    <div>
      <Link href={`/${item.type}/${item.id}`}>
        <a>
          <Heading as="h5">{item.name}</Heading>
        </a>
      </Link>
      <Heading as="h6">
        {item.artists.map((artist) => artist.name).join(', ')}
      </Heading>
    </div>
    <span>{formatDuration(item.duration_ms)}</span>
  </li>
);

interface Props {
  tracks: SpotifyApi.TrackObjectSimplified[];
  className?: string;
}

const TrackList = ({ tracks, className }: Props) => (
  <div className={className}>
    <Heading as="h5">Tracklist</Heading>
    <ul>
      {tracks.map((track, index) => (
        <Track item={track} key={index} />
      ))}
    </ul>
  </div>
);
export default TrackList;
