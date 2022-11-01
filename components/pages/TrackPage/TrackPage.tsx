import { Album, Lyrics, Track, TrackFeatures } from '../../../types';
import { Display, Heading, Paragraph } from '../../Typography/Typography';
import AlbumAndFeatures from './AlbumAndFeatures/AlbumAndFeatures';

import styles from './TrackPage.module.scss';

type Data = {
  album: Album;
  track: Track;
  features: TrackFeatures;
  lyrics: Lyrics;
};

type Props = {
  data: Data;
};

const TrackPage = ({ data }: Props) => {
  const { album, track, features, lyrics } = data;

  const artists = track.artists.map((artist) => artist.name);

  return (
    <main className="container">
      <header>
        <Heading as="h3">{track.type}</Heading>
        <Display as="h1" small>
          {track.name}
        </Display>
        <Heading as="h2">{artists.join(', ')}</Heading>
      </header>
      {/* //TODO: Remove inline styling   */}
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* //TODO: Create lyrics component */}
        <div>
          <Paragraph className={styles.lyrics} as="span">
            {lyrics.lyrics_body}
          </Paragraph>
        </div>
        <AlbumAndFeatures data={{ album, features, track }} />
      </section>
    </main>
  );
};
export default TrackPage;
