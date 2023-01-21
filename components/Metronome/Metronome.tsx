import { useMetronome } from '../../utilities/hooks';
import { click } from '../../utilities/helpers';

import styles from './Metronome.module.scss';

const Metronome = () => {
  const { isRunning, setIsRunning, tempo, setTempo } = useMetronome(
    () => click(500),
    120
  );

  const handleChange = (e) => setTempo(Number(e.target.value));

  const handleDecrement = () => {
    if (tempo > 40) setTempo(tempo - 1);
  };

  const handleIncrement = () => {
    if (tempo < 240) setTempo(tempo + 1);
  };

  return (
    <div className={styles.metronome}>
      <div>
        <button onClick={handleDecrement}>-</button>
        <input
          type="range"
          min="30"
          max="240"
          value={tempo}
          onChange={handleChange}
        />
        <button onClick={handleIncrement}>+</button>
      </div>
      <div>
        <span>{tempo} BPM</span>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};
export default Metronome;
