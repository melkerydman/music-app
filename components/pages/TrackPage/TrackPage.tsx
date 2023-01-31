import { useEffect, useState } from 'react';
import Image from 'next/future/image';

import {
  formatDuration,
  formatKey,
  formatMode,
  formatTempo,
  formatTimeSignature,
} from '../../../utilities/helpers';
import DataItems from '../../DataItems/DataItems';
import PageHeader from '../../layout/PageHeader/PageHeader';
import PageSection from '../../layout/PageSection/PageSection';
import TrackList from '../../TrackList/TrackList';
import Lyrics from './Lyrics/Lyrics';
import NewGrid from '../../NewGrid/NewGrid';
import { Lyrics as LyricsType } from '../../../types';

import styles from './TrackPage.module.scss';
import ScrollContent from '../../layout/ScrollContent/ScrollContent';
import Metronome from '../../Metronome/Metronome';
import getLyrics from '../../../utilities/services/musixmatch/getLyrics';

type DataType = {
  album: SpotifyApi.AlbumObjectFull;
  track: SpotifyApi.TrackObjectFull;
  features: SpotifyApi.AudioFeaturesObject;
};

type Props = {
  data: DataType;
};

function splitText(text) {
  return text.split(/\n{2,}/);
}

// TODO: Proper class names
const TrackPage = ({ data }: Props) => {
  const { album, track, features } = data;

  const [fetchedLyrics, setFetchedLyrics] = useState<any[]>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const result = (await getLyrics(track.external_ids.isrc)) as LyricsType;
        const lyrics = splitText(result.lyrics_body);
        setFetchedLyrics(lyrics);
        setIsFetching(false);
      } catch {
        setFetchedLyrics(['Lyrics not found.']);
        setIsFetching(false);
      }
    };
    fetchLyrics();
  }, [track.external_ids.isrc]);

  const dataItems = [
    {
      title: 'Tempo',
      value: `${formatTempo(features.tempo)} BPM`,
      description: `Double speed -> ${features.tempo * 2}
      Half speed -> ${features.tempo / 2}`,
    },
    {
      title: 'Key',
      value: `${formatKey(features.key)} ${formatMode(features.mode)}`,
      description: '',
    },
    {
      title: 'Time Signature',
      value: formatTimeSignature(features.time_signature),
      description: '',
    },
    {
      title: 'Duration',
      value: formatDuration(features.duration_ms),
      description: '',
    },
  ];

  return (
    <main className={styles.main}>
      <PageSection>
        <NewGrid container className={styles.wrapper}>
          <NewGrid item sm={4} className={styles.left}>
            <div className={styles['image-wrapper']}>
              <Image
                src={album.images[0].url}
                alt={album.name}
                fill
                sizes="(max-width: 768px) 100vw,
              25vw"
                priority
              />
            </div>
            <TrackList simple album={album} tracks={album.tracks.items} />
          </NewGrid>
          <NewGrid item sm={8} className={styles.right}>
            <PageHeader
              image={album.images[0]}
              heading={track.name}
              subHeading={track.artists.map((artist) => artist.name).join(', ')}
            />
            <NewGrid container>
              <NewGrid className={styles['data-items']} item sm={8}>
                <DataItems items={dataItems} />
              </NewGrid>
              <NewGrid item sm={4}>
                <Metronome initialTempo={formatTempo(features.tempo)} />
              </NewGrid>
            </NewGrid>
            {/* <Lyrics isrc={track.external_ids.isrc} /> */}
            <ScrollContent className={styles['scroll-content']}>
              <Lyrics lyrics={fetchedLyrics} isFetching={isFetching} />
            </ScrollContent>
          </NewGrid>
        </NewGrid>
      </PageSection>
    </main>
  );
};
export default TrackPage;
