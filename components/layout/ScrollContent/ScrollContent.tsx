// TODO: Scroll speed needs fine-tuning

import React, { useEffect, useRef, useState } from 'react';
import { handleClassName } from '../../../utilities/helpers';
import { useWindowDimensions } from '../../../utilities/hooks';
import styles from './ScrollContent.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  scrollDuration?: number;
};

const getScrollPercentage = () => {
  const winHeight = window.innerHeight;
  const { body } = document;
  const html = document.documentElement;
  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const windowScroll = window.pageYOffset;
  const scrollPercentage = (windowScroll / (docHeight - winHeight)) * 100;

  return Math.ceil(scrollPercentage);
};

const ScrollContent: React.FC<Props> = React.memo(
  ({ children, className, scrollDuration = 60 }): JSX.Element => {
    const [isMobile, setIsMobile] = useState(null);
    const [scrolledPercentage, setScrolledPercentage] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const scrollBarRef = useRef<HTMLDivElement>(null);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
      setIsMobile(width < 768);
    }, [width]);

    useEffect(() => {
      scrollBarRef.current.style.height = `${scrolledPercentage}%`;
    }, [scrolledPercentage]);

    const handleScroll = () => {
      setScrolledPercentage(getScrollPercentage());
    };

    useEffect(() => {
      if (isMobile) return undefined;

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [height, width, isMobile]);

    useEffect(() => {
      const { body } = document;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      if (!isScrolling) return undefined;
      const interval = setInterval(() => {
        window.scrollBy(0, 1);
        if (scrolledPercentage >= 100) {
          clearInterval(interval);
          setIsScrolling(false);
        }
      }, scrollDuration / docHeight);
      return () => clearInterval(interval);
    }, [isScrolling, scrolledPercentage, scrollDuration, height]);

    const ScrollBar = React.memo(() => (
      <div className={styles.scroll__bar}>
        <div ref={scrollBarRef} className={styles['scroll__bar--fill']} />
      </div>
    ));

    ScrollBar.displayName = 'ScrollBar';

    const Desktop = () => (
      <div
        className={handleClassName([className || '', styles['scroll-content']])}
      >
        <div className={styles.content}>{children}</div>
        <div className={styles.scroll}>
          <button
            className={handleClassName([
              styles.scroll__button,
              'p-sm normal',
              isScrolling ? styles.active : '',
            ])}
            onClick={() => {
              setIsScrolling((prev) => !prev);
            }}
          >
            Auto-scroll
          </button>
          <ScrollBar />
          <div
            className={handleClassName([styles.scroll__number, 'p-sm normal'])}
          >
            {scrolledPercentage}%
          </div>
        </div>
      </div>
    );

    const Mobile = () => <div className={className || ''}>{children}</div>;

    return <>{isMobile ? <Mobile /> : <Desktop />}</>;
  }
);

ScrollContent.displayName = 'ScrollContent';
export default ScrollContent;
