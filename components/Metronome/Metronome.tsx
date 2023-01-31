import { handleClassName } from '../../utilities/helpers';
import { useMetronome } from '../../utilities/hooks';
import { Paragraph } from '../Typography/Typography';

import styles from './Metronome.module.scss';
import InputSlider from '../InputSlider/InputSlider';

interface Props {
  initialTempo?: number;
}

const Metronome: React.FC<Props> = ({ initialTempo }) => {
  const { isPlaying, start, stop, tempo, changeTempo } =
    useMetronome(initialTempo);

  const minTempo = 40;
  const maxTempo = 280;

  return (
    <div className={styles.metronome}>
      <div className={styles.timer}>
        <div className={styles.timer__tempo}>
          <button
            className={handleClassName([])}
            onClick={isPlaying ? stop : start}
          >
            <div className={styles.circle}></div>
            <Paragraph as="div" className={styles.tempo}>
              {tempo} BPM
            </Paragraph>
          </button>
        </div>
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
