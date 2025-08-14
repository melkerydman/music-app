// TODO: Solve issue where Metronome tempo doesn't update on changing songs
// Issue seems to be with the "tempo" object return from useMetronome hook

import { useState, useEffect } from 'react';
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

  const [beatPosition, setBeatPosition] = useState<'center' | 'left' | 'right'>(
    'left'
  );

  const minTempo = 40;
  const maxTempo = 280;

  // Animation logic for horizontal beat indicator
  useEffect(() => {
    if (!isPlaying) {
      setBeatPosition('left');
      return undefined;
    }

    const beatInterval = (60 / tempo) * 1000; // Full beat in milliseconds
    let currentDirection: 'left' | 'right' = 'right'; // Start with right so first move goes right

    const animate = () => {
      setBeatPosition(currentDirection);
      currentDirection = currentDirection === 'left' ? 'right' : 'left';
    };

    // Start at left position and begin moving to sync with clicks
    setBeatPosition('left');

    // Start moving immediately so we arrive at right when first click happens
    setTimeout(() => setBeatPosition('right'), 0);

    // Then alternate starting from the next beat
    currentDirection = 'left'; // Next move will be back to left
    const intervalId = setInterval(animate, beatInterval);

    return () => clearInterval(intervalId);
  }, [isPlaying, tempo]);

  return (
    <div className={styles.metronome}>
      <Heading
        as="h5"
        className={handleClassName([styles.metronome__heading, 'p normal'])}
      >
        Metronome
      </Heading>
      <div className={styles.timer}>
        {/* Beat indicator that moves left and right */}
        <div
          className={styles['beat-indicator']}
          style={
            {
              '--beat-position': (() => {
                if (beatPosition === 'left') return '4px';
                if (beatPosition === 'right') return 'calc(100% - 4px)';
                return '50%';
              })(),
              '--beat-duration': isPlaying ? `${60 / tempo}s` : '0.2s',
            } as React.CSSProperties
          }
        />

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
