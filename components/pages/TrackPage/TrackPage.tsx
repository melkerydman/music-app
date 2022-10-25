import { Lyrics, Track, TrackFeatures } from '../../../types';
import { Display, Heading, Paragraph } from '../../Typography/Typography';

import styles from './TrackPage.module.scss';

const TrackPage = ({ data }) => {
  const {
    data: trackData,
    features,
    lyrics,
  }: { data: Track; features: TrackFeatures; lyrics: Lyrics } = data;

  const artists = trackData.artists.map((artist) => artist.name);

  return (
    <>
      <div>
        <Heading as="h3">{trackData.type}</Heading>;
        <Display as="h1" small>
          {trackData.name}
        </Display>
        <Heading as="h2">{artists.join(', ')}</Heading>;
        <Paragraph className={styles.lyrics} as="span">
          {lyrics.lyrics_body}
        </Paragraph>
      </div>
      <img
        width={trackData.album.images[1].width}
        height={trackData.album.images[1].height}
        src={trackData.album.images[1].url}
        alt={trackData.album.name}
      />
      <div>
        <h1>Features</h1>
        <div>{features.key}</div>
        <div>{features.mode}</div>
        <div>{features.tempo}</div>
        <div>{features.time_signature}</div>
      </div>
    </>
  );
};
export default TrackPage;
