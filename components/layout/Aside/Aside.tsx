import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from '../../../utilities/hooks';
import styles from './Aside.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Aside: React.FC<Props> = ({ children, className }): JSX.Element => {
  const [isMobile, setIsMobile] = useState(null);
  const asideRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowDimensions();

  // TODO! logging just to avoid error commmiting, remove this
  console.log(' 🔴', isMobile, className);
  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  useEffect(() => {
    const topPosition = asideRef.current.getBoundingClientRect().top;
    asideRef.current.style.height = `${height - topPosition}px`;
  }, [asideRef, height, width]);

  useEffect(() => {
    const handleScroll = () => {
      // if (asideRef.current && scrollRef.current && contentRef.current) {
      if (asideRef.current) {
        const topPosition = asideRef.current.getBoundingClientRect().top;
        asideRef.current.style.height = `${height - topPosition}px`;
      }
      console.log('scroll main');
    };

    const handleScrollContent = () => {
      const contentHeight = contentRef.current.scrollHeight;
      const scrollPosition = contentRef.current.scrollTop;
      const scrollHeight = contentHeight - asideRef.current.clientHeight;
      console.log('contentHeight 🔴', contentHeight);
      console.log('scrollHeight 🔴', scrollHeight);
      console.log('content scroll position 🔴', scrollPosition);

      scrollRef.current.style.height = `${
        (scrollPosition / scrollHeight) * 100
      }%`;
    };
    contentRef.current.addEventListener('scroll', handleScrollContent);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      contentRef.current.removeEventListener('scroll', handleScrollContent);
    };
  }, [height]);

  const ScrollBar = () => (
    <div className={styles['scroll-bar']}>
      <div ref={scrollRef} className={styles['scroll-bar__fill']} />
    </div>
  );

  return (
    <aside ref={asideRef} className={styles.aside}>
      <ScrollBar />
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </aside>
  );
};
export default Aside;
