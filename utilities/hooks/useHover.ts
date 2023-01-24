import { useEffect, useRef, useState } from 'react';

const useHover = <T extends HTMLElement>(): [
  React.MutableRefObject<T>,
  boolean
] => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<T | null>(null);

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    const node = ref.current;
    node.addEventListener('mouseover', handleMouseOver);
    node.addEventListener('mouseout', handleMouseOut);
    return () => {
      node.removeEventListener('mouseover', handleMouseOver);
      node.removeEventListener('mouseout', handleMouseOut);
    };
  }, [ref]);
  return [ref, isHovering];
};

export default useHover;
