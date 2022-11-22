import { useLayoutEffect } from 'react';
import useHeader from '../../store/useHeader';

const useWindowSize = (element: HTMLElement) => {
  const setHeight = useHeader((props) => props.setHeight);

  useLayoutEffect(() => {
    function updateHeight() {
      setHeight(`${element.offsetHeight}px`);
    }
    element.addEventListener('resize', updateHeight);
    updateHeight();
    return () => element.removeEventListener('resize', updateHeight);
  }, []);
};

export default useWindowSize;
