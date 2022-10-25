import type { Album as AlbumType, TrackFeatures } from '../../../../types';
import { Heading } from '../../../Typography/Typography';
import Album from '../Album/Album';
import Feature from '../Feature/Feature';
import styles from './AlbumAndFeatures.module.scss';

// TODO: Rename TrackFeatures to AudioFeatures in EVERY file
type Data = {
  album: AlbumType;
  features: TrackFeatures;
};

type Props = {
  data: Data;
};

const AlbumAndFeatures = ({ data }: Props) => {
  const { album, features } = data;

  return (
    <aside>
      <img
        width={album.images[1].width}
        height={album.images[1].height}
        src={album.images[1].url}
        alt={album.name}
      />
      <div className={styles['features']}>
        <Feature title="Tempo" value={features.tempo.toString()} />
        <Feature title="Key" value={features.key.toString()} />
        <Feature title="Mode" value={features.mode.toString()} />
        <Feature
          title="Time Signature"
          value={features.time_signature.toString()}
        />
        <Feature title="Duration" value={features.duration_ms.toString()} />
      </div>
      <Album album={album} />
    </aside>
  );
};
export default AlbumAndFeatures;
