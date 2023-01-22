import { useMetronome } from '../../utilities/hooks';

import styles from './Metronome.module.scss';

const Metronome = () => {
  const { isPlaying, start, stop, tempo, changeTempo } = useMetronome(120);

  return (
    <div className={styles.metronome}>
      <input
        type="range"
        min="40"
        max="240"
        value={tempo}
        onChange={(e) => changeTempo(e.target.value)}
      />
      <div className={styles.tempo}>{tempo}</div>
      <button onClick={isPlaying ? stop : start}>
        {isPlaying ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};
export default Metronome;
