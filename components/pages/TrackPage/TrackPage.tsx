// import useHeaderStore from '../../../store/useHeaderStore';
import {
  Album,
  Lyrics as LyricsType,
  Track,
  TrackFeatures,
} from '../../../types';
import PageSection from '../../layout/PageSection/PageSection';
import { Heading } from '../../Typography/Typography';
import AlbumAndFeatures from './AlbumAndFeatures/AlbumAndFeatures';
import Lyrics from './Lyrics/Lyrics';

import styles from './TrackPage.module.scss';

type Data = {
  album: Album;
  track: Track;
  features: TrackFeatures;
  lyrics: LyricsType;
};

type Props = {
  data: Data;
};

// TODO: Proper class names
const TrackPage = ({ data }: Props) => {
  const { album, track, features, lyrics } = data;
  // TODO: Remove headerheight completely?
  // const headerHeight = useHeaderStore((props) => props.height);

  const artists = track.artists.map((artist) => artist.name);

  return (
    <PageSection containerClassName={styles.container}>
      <header>
        {/* <Heading as="h3">{track.type}</Heading> */}
        <Heading as="h4">{artists.join(', ')}</Heading>
        <Heading as="h1">{track.name}</Heading>
      </header>
      <div className={styles.content}>
        <AlbumAndFeatures
          className={styles['album-and-features']}
          data={{ album, features, track }}
        />
        <Lyrics data={{ lyrics }} />
      </div>
    </PageSection>
  );
};
export default TrackPage;
