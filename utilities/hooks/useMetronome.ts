import { useState, useRef, useEffect, useCallback } from 'react';

const useMetronome = (initialTempo) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(initialTempo);
  const audioCtxRef = useRef(null);

  const oscRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const scheduleAheadTimeRef = useRef(0.1);
  const lookaheadRef = useRef(null);

  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    oscRef.current = audioCtxRef.current.createOscillator();
    oscRef.current.connect(audioCtxRef.current.destination);
  }, []);

  const tick = useCallback(() => {
    oscRef.current.frequency.setValueAtTime(840, nextNoteTimeRef.current);
    oscRef.current.frequency.setValueAtTime(0, nextNoteTimeRef.current + 0.03);
    nextNoteTimeRef.current += 60 / tempo;
  }, [tempo]);

  useEffect(() => {
    if (isPlaying)
      lookaheadRef.current = setInterval(() => {
        while (
          nextNoteTimeRef.current <
          audioCtxRef.current.currentTime + scheduleAheadTimeRef.current
        ) {
          tick();
        }
      }, 25);

    return () => {
      clearInterval(lookaheadRef.current);
    };
  }, [isPlaying, tick]);

  const start = () => {
    setIsPlaying(true);
    if (!oscRef.current) {
      oscRef.current = audioCtxRef.current.createOscillator();
      oscRef.current.connect(audioCtxRef.current.destination);
    }
    nextNoteTimeRef.current = audioCtxRef.current.currentTime;
    oscRef.current.frequency.setValueAtTime(840, nextNoteTimeRef.current);
    oscRef.current.frequency.setValueAtTime(0, nextNoteTimeRef.current + 0.03);
    oscRef.current.start(nextNoteTimeRef.current);
    nextNoteTimeRef.current += 60 / tempo;

    tick();
  };

  const stop = () => {
    oscRef.current.frequency.setValueAtTime(0, 0);
    setIsPlaying(false);
    clearInterval(lookaheadRef.current);

    // TODO: Find way to stop metronome without getting the crackling sound
    oscRef.current.stop();
    oscRef.current.disconnect();
    oscRef.current = null;
  };

  const changeTempo = (newTempo) => {
    setTempo(newTempo);
  };

  return { isPlaying, start, stop, tempo, changeTempo };
};
export default useMetronome;
