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
  const [tempo, setTempo] = useState(features.tempo);

  const [fetchedLyrics, setFetchedLyrics] = useState<any[]>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const result = (await getLyrics(track.external_ids.isrc)) as LyricsType;
        const lyrics = splitText(result.lyrics_body);
        // Repeat lyrics for auto scroll testing
        const repeatedLyrics = [
          ...lyrics,
          ...lyrics,
          ...lyrics,
          ...lyrics,
          ...lyrics,
        ];
        setFetchedLyrics(repeatedLyrics);
        setIsFetching(false);
      } catch {
        setFetchedLyrics(['Lyrics not found.']);
        setIsFetching(false);
      }
    };
    fetchLyrics();
  }, [track]);

  useEffect(() => {
    setTempo(features.tempo);
  }, [features]);

  const unavailableMsg = 'Data unavailable';

  const dataItems = [
    {
      title: 'Tempo',
      value: features?.tempo
        ? `${formatTempo(features.tempo)} BPM`
        : unavailableMsg,
      description: features?.tempo
        ? `Double speed -> ${features.tempo * 2}
      Half speed -> ${features.tempo / 2}`
        : '',
    },
    {
      title: 'Key',
      value:
        features?.key !== undefined && features?.mode !== undefined
          ? `${formatKey(features.key)} ${formatMode(features.mode)}`
          : unavailableMsg,
      description: '',
    },
    {
      title: 'Time Signature',
      value: features?.time_signature
        ? formatTimeSignature(features.time_signature)
        : unavailableMsg,
      description: '',
    },
    {
      title: 'Duration',
      value: track?.duration_ms
        ? formatDuration(track.duration_ms)
        : unavailableMsg,
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
            <NewGrid container className={styles.mb}>
              <NewGrid className={styles['data-items']} item sm={8}>
                <DataItems items={dataItems} />
              </NewGrid>
              <NewGrid className={styles.metronome} item sm={4}>
                <Metronome initialTempo={formatTempo(tempo) || 120} />
              </NewGrid>
            </NewGrid>
            <ScrollContent
              scrollDuration={track.duration_ms}
              className={styles['scroll-content']}
            >
              <Lyrics lyrics={fetchedLyrics} isFetching={isFetching} />
            </ScrollContent>
          </NewGrid>
        </NewGrid>
      </PageSection>
    </main>
  );
};
export default TrackPage;
