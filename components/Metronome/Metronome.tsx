import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { handleClassName } from '../../utilities/helpers';
import { useMetronome } from '../../utilities/hooks';
import { Paragraph } from '../Typography/Typography';

import styles from './Metronome.module.scss';

interface Props {
  initialTempo?: number;
}

const Metronome: React.FC<Props> = ({ initialTempo }) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { isPlaying, start, stop, tempo, changeTempo } =
    useMetronome(initialTempo);

  const minTempo = 40;
  const maxTempo = 280;

  let timeoutId;
  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsHovering(false);
    }, 300);
  };

  const handleIncrement = () => {
    if (tempo < maxTempo) {
      changeTempo(tempo + 1);
    }
  };
  const handleDecrement = () => {
    if (tempo > minTempo) {
      changeTempo(tempo - 1);
    }
  };

  useEffect(() => {
    if (!hoverRef.current) return undefined;
    const copy = hoverRef.current;

    copy.addEventListener('mouseenter', handleMouseEnter);
    copy.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      copy.addEventListener('mouseenter', handleMouseEnter);
      copy.addEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={hoverRef} className={styles.metronome}>
      <div
        className={handleClassName([
          styles.slider,
          !isHovering ? 'visually-hidden' : '',
        ])}
      >
        <button className={styles.button} onClick={handleDecrement}>
          {<RemoveIcon fontSize="small" />}
        </button>
        <input
          type="range"
          min={minTempo}
          max={maxTempo}
          value={tempo}
          onChange={(e) => changeTempo(Number(e.target.value))}
        />
        <button className={styles.button} onClick={handleIncrement}>
          {<AddIcon fontSize="small" />}
        </button>
      </div>

      <button
        className={handleClassName([
          styles.play,
          isPlaying ? styles.active : '',
        ])}
        onClick={isPlaying ? stop : start}
      >
        <div className={styles.circle}></div>
        <Paragraph as="div" className={styles.tempo}>
          {tempo} BPM
        </Paragraph>
      </button>
    </div>
  );
};
export default Metronome;
