import { Lyrics as LyricsType } from '../../../../types';
import { Heading, Paragraph } from '../../../Typography/Typography';
import styles from './Lyrics.module.scss';

type Data = {
  lyrics: LyricsType;
};

type Props = {
  data: Data;
};

const Lyrics = ({ data }: Props): JSX.Element => {
  const { lyrics } = data;

  return (
    <div className={styles['lyrics-outer']}>
      <Heading as="h4">Lyrics</Heading>
      <Paragraph sans className={styles.lyrics} as="span">
        {lyrics ? lyrics.lyrics_body : 'Lyrics not found 😤'}
      </Paragraph>
    </div>
  );
};

export default Lyrics;
