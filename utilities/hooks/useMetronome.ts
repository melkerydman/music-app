// TODO: Set a variable for fadeout time

import { useState, useRef, useEffect, useCallback } from 'react';

const useMetronome = (initialTempo) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(initialTempo);
  const audioCtxRef = useRef(null);

  const oscRef = useRef(null);
  const gainNodeRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const scheduleAheadTimeRef = useRef(0.1);
  const lookaheadRef = useRef(null);

  const init = () => {
    oscRef.current = audioCtxRef.current.createOscillator();
    oscRef.current.frequency.value = 440;

    gainNodeRef.current = audioCtxRef.current.createGain();
    oscRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioCtxRef.current.destination);
  };

  useEffect(() => {
    audioCtxRef.current = new window.AudioContext();
    init();
  }, []);

  const tick = useCallback(() => {
    gainNodeRef.current.gain.setValueAtTime(1, nextNoteTimeRef.current);
    gainNodeRef.current.gain.linearRampToValueAtTime(
      0,
      nextNoteTimeRef.current + 0.05
    );

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
      init();
    }

    nextNoteTimeRef.current = audioCtxRef.current.currentTime;
    gainNodeRef.current.gain.setValueAtTime(1, nextNoteTimeRef.current);
    gainNodeRef.current.gain.linearRampToValueAtTime(
      0,
      nextNoteTimeRef.current + 0.05
    );

    oscRef.current.start(nextNoteTimeRef.current);
    nextNoteTimeRef.current += 60 / tempo;

    tick();
  };

  const stop = () => {
    gainNodeRef.current.gain.setValueAtTime(0, nextNoteTimeRef.current);
    setIsPlaying(false);
    clearInterval(lookaheadRef.current);

    // Fading out sound
    gainNodeRef.current.gain.exponentialRampToValueAtTime(
      0.0001,
      audioCtxRef.current.currentTime + 0.2
    );
    setTimeout(() => {
      oscRef.current.stop();
      oscRef.current.disconnect();
      gainNodeRef.current.disconnect();
      oscRef.current = null;
      gainNodeRef.current = null;
    }, 200);
  };

  const changeTempo = (newTempo) => {
    setTempo(newTempo);
  };

  return { isPlaying, start, stop, tempo, changeTempo };
};
export default useMetronome;
