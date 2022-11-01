import type {
  Album as AlbumType,
  Track,
  TrackFeatures,
} from '../../../../types';
import {
  handleClassName,
  formatKey,
  formatMode,
  formatTempo,
  formatTimeSignature,
  formatDuration,
} from '../../../../utilities/helpers';
import Album from '../Album/Album';
import Feature from '../Feature/Feature';
import styles from './AlbumAndFeatures.module.scss';

// TODO: Rename TrackFeatures to AudioFeatures in EVERY file
type Data = {
  album: AlbumType;
  features: TrackFeatures;
  track: Track;
};

type Props = {
  data: Data;
};

const AlbumAndFeatures = ({ data }: Props) => {
  const { album, features, track } = data;

  return (
    <aside className={handleClassName([styles['album-and-features']])}>
      {/* // TODO: Use next image component and see how that affects stuff */}
      <img
        width={album.images[0].width}
        height={album.images[0].height}
        src={album.images[0].url}
        alt={album.name}
      />
      <div className={styles['features']}>
        <Feature title="Tempo" value={formatTempo(features.tempo)} />
        <Feature
          title="Key"
          value={`${formatKey(features.key)} ${formatMode(features.mode)}`}
        />
        <Feature
          title="Time Signature"
          value={formatTimeSignature(features.time_signature)}
        />
        <Feature
          title="Duration"
          value={formatDuration(features.duration_ms)}
        />
      </div>
      {/* // TODO: Find better way of keeping track of which track is active */}
      <Album activeId={track.id} album={album} />
    </aside>
  );
};
export default AlbumAndFeatures;
