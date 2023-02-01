// TODO: Solve issue where Metronome tempo doesn't update on changing songs
// Issue seems to be with the "tempo" object return from useMetronome hook

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import { handleClassName } from '../../utilities/helpers';
import { useMetronome } from '../../utilities/hooks';
import { Heading, Paragraph } from '../Typography/Typography';

import styles from './Metronome.module.scss';
import InputSlider from '../InputSlider/InputSlider';

interface Props {
  initialTempo: number;
}

const Metronome: React.FC<Props> = ({ initialTempo }) => {
  const { isPlaying, start, stop, tempo, changeTempo } =
    useMetronome(initialTempo);

  const minTempo = 40;
  const maxTempo = 280;

  return (
    <div className={styles.metronome}>
      <Heading
        as="h5"
        className={handleClassName([styles.metronome__heading, 'p normal'])}
      >
        Metronome
      </Heading>
      <div className={styles.timer}>
        <button
          className={handleClassName([
            styles.button,
            isPlaying ? styles.active : '',
          ])}
          onClick={isPlaying ? stop : start}
        >
          {!isPlaying ? <PlayArrowIcon /> : <StopIcon />}

          <Paragraph
            as="div"
            className={handleClassName(['p-sm bold', styles.tempo])}
          >
            {tempo} BPM
          </Paragraph>
        </button>
      </div>
      <InputSlider
        value={tempo}
        setValue={changeTempo}
        minValue={minTempo}
        maxValue={maxTempo}
        step={3}
      />
    </div>
  );
};
export default Metronome;
