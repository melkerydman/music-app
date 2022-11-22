import Image from 'next/future/image';
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
import useWindowSize from '../../../../utilities/hooks/useWindowSize';
import AlbumInfo from '../AlbumInfo/AlbumInfo';
import Feature from '../Feature/Feature';
import TrackList from '../TrackList/TrackList';
import styles from './AlbumAndFeatures.module.scss';

// TODO: Rename TrackFeatures to AudioFeatures in EVERY file
type Data = {
  album: AlbumType;
  features: TrackFeatures;
  track: Track;
};

type Props = {
  data: Data;
  className?: string;
};

const AlbumAndFeatures = ({ data, className }: Props): JSX.Element => {
  const { album, features, track } = data;

  return (
    <aside className={handleClassName([className || '', styles.outer])}>
      <Image
        width={album.images[0].width}
        height={album.images[0].height}
        src={album.images[0].url}
        alt={album.name}
      />
      {/* // TODO: Rename wrapper */}
      <div className={styles.inner}>
        <AlbumInfo album={album} />
        <div className={styles.features}>
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
        {/* // TODO: Store active track in state instead? */}
        <TrackList activeId={track.id} album={album}></TrackList>
      </div>
    </aside>
  );
};
export default AlbumAndFeatures;
