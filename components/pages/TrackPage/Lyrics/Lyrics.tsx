import { useEffect, useState } from 'react';
import getLyrics from '../../../../utilities/services/musixmatch/getLyrics';
import { Lyrics as LyricsType } from '../../../../types';
import { Heading, Paragraph } from '../../../Typography/Typography';

import styles from './Lyrics.module.scss';

type Props = {
  isrc: string;
};

function splitText(text) {
  return text.split(/\n{2,}|\n/);
}

function splitArrayInMiddle(arr: Array<string>) {
  const middle = Math.floor(arr.length / 2);
  const firstHalf = arr.slice(0, middle);
  const secondHalf = arr.slice(middle);

  return { firstHalf, secondHalf };
}

const Lyrics = ({ isrc }: Props): JSX.Element => {
  const [fetchedLyrics, setFetchedLyrics] = useState<any[]>(null);
  const [columns, setColumns] = useState<'one' | 'two'>('one');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const result = (await getLyrics(isrc)) as LyricsType;
        const lyrics = splitText(result.lyrics_body);
        setFetchedLyrics(lyrics);
        setIsFetching(false);
      } catch {
        setFetchedLyrics(['Lyrics not found.']);
        setIsFetching(false);
      }
    };
    fetchLyrics();
  }, [isrc]);

  const DisplayLyrics = () => {
    if (isFetching) return <div>Looking for lyrics.</div>;

    if (fetchedLyrics?.length > 1) {
      if (columns === 'two') {
        const result = splitArrayInMiddle(fetchedLyrics);
        return (
          <div style={{ display: 'flex' }}>
            <div className={styles.lyrics} style={{ width: '50%' }}>
              {result.firstHalf.map((lyric, index) => (
                <Paragraph key={index} as="div">
                  {lyric}
                </Paragraph>
              ))}
            </div>
            <div className={styles.lyrics} style={{ width: '50%' }}>
              {result.secondHalf.map((lyric, index) => (
                <Paragraph key={index} as="div">
                  {lyric}
                </Paragraph>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div className={styles.lyrics}>
          {fetchedLyrics.map((lyric, index) => (
            <Paragraph key={index} as="div">
              {lyric}
            </Paragraph>
          ))}
        </div>
      );
    }
    return (
      <Paragraph sans className={styles.lyrics} as="div">
        {fetchedLyrics}
      </Paragraph>
    );
  };
  return (
    <div className={styles.lyrics__outer}>
      <Heading className={styles.lyrics__heading} as="h3">
        Lyrics
      </Heading>
      <div className={styles.toolbar}>
        <button onClick={() => setColumns('one')}>Single column</button>
        <button onClick={() => setColumns('two')}>Two columns</button>
      </div>
      <DisplayLyrics />
    </div>
  );
};

export default Lyrics;
