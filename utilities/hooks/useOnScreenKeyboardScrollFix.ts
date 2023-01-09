import { useEffect } from 'react';
import useStore from '../../store/useStore';

const useOnScreenKeyboardScrollFix = () => {
  const isFocus = useStore((state) => state.search.isFocus);

  console.log('running scrollFix 🔴');
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    if (isFocus) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFocus]);
};

export default useOnScreenKeyboardScrollFix;
