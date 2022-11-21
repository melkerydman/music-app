import Image from 'next/image';
import {
  Album,
  Lyrics as LyricsType,
  Track,
  TrackFeatures,
} from '../../../types';
import PageSection from '../../PageSection/PageSection';
import { Display, Heading } from '../../Typography/Typography';
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

  const artists = track.artists.map((artist) => artist.name);

  return (
    <>
      <PageSection containerClassName="flex">
        <>
          <div className={styles.content}>
            <header className={styles.header}>
              <Heading as="h3">{track.type}</Heading>
              <Display as="h1" small>
                {track.name}
              </Display>
              <Heading as="h2">{artists.join(', ')}</Heading>
            </header>
            <Lyrics data={{ lyrics }} />
          </div>
          <AlbumAndFeatures
            className={styles['album-and-features']}
            data={{ album, features, track }}
          />
        </>
      </PageSection>
      <div style={{ display: 'flex' }}>
        <h2>{artists.join(', ')}</h2>
        <Image
          src={track.album.images[0].url}
          width={track.album.images[0].width}
          height={track.album.images[0].height}
          alt=""
        ></Image>
      </div>
    </>
  );
};
export default TrackPage;
