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

const Lyrics = ({ isrc }: Props): JSX.Element => {
  const [fetchedLyrics, setFetchedLyrics] = useState<any[]>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const result = (await getLyrics(isrc)) as LyricsType;
        const lyrics = splitText(result.lyrics_body);
        setFetchedLyrics(lyrics);
      } catch {
        setFetchedLyrics(['Lyrics not found.']);
      }
    };
    fetchLyrics();
  }, [isrc]);

  const DisplayLyrics = () => {
    if (fetchedLyrics?.length > 1) {
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
      <DisplayLyrics />
    </div>
  );
};

export default Lyrics;
