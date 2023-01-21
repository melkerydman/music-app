import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// TODO: Triggers a lot of re-renders which causes the sound to play in the wrong way when pressing play
// TODO: Tempo not correct when playing in background
const useMetronome = (callback: () => void, initialTempo: number) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [tempo, setTempo] = useState<number>(initialTempo);
  const expectedTimeRef = useRef<number>(performance.now() + 60000 / tempo);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const memoizedTempo = useMemo(() => tempo, [tempo]);

  const round = useCallback(() => {
    console.log('running round 🟢');
    callback();
    const driftedTime = performance.now() - expectedTimeRef.current;
    expectedTimeRef.current += 60000 / memoizedTempo;
    timeoutRef.current = setTimeout(round, 60000 / memoizedTempo - driftedTime);
  }, [callback, memoizedTempo]);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }
    console.log('not undefined 🟢');
    timeoutRef.current = setTimeout(round, 60000 / memoizedTempo);

    return () => {
      console.log('cleanup 🔴');
      clearTimeout(timeoutRef.current);
    };
  }, [round, memoizedTempo, isRunning]);

  return { isRunning, setIsRunning, tempo, setTempo };
};

export default useMetronome;
