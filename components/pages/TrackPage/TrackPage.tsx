import { Album, Lyrics, Track, TrackFeatures } from '../../../types';
import { handleClassName } from '../../../utilities/helpers';
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

// TODO: Proper class names
const TrackPage = ({ data }: Props) => {
  const { album, track, features, lyrics } = data;

  const artists = track.artists.map((artist) => artist.name);

  return (
    <main className={handleClassName(['container', styles['page']])}>
      <header className={styles['header']}>
        <Heading as="h3">{track.type}</Heading>
        <Display as="h1" small>
          {track.name}
        </Display>
        <Heading as="h2">{artists.join(', ')}</Heading>
      </header>
      <section className={styles['content']}>
        {/* //TODO: Create lyrics component */}
        <div className={styles['lyrics-outer']}>
          <Heading as="h4">Lyrics</Heading>
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
