import React, { useEffect, useRef, useState } from 'react';
import { handleClassName, getSmallestNumber } from '../../../utilities/helpers';
import { useWindowDimensions } from '../../../utilities/hooks';
import styles from './SideContent.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SideContent: React.FC<Props> = React.memo(
  ({ children, className }): JSX.Element => {
    const [isMobile, setIsMobile] = useState(null);
    const [maxHeight, setMaxHeight] = useState(null);
    const [isSticky, setIsSticky] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollBarRef = useRef<HTMLDivElement>(null);

    const { width, height } = useWindowDimensions();

    const fillScroll = () => {
      const scrollableHeight =
        contentRef.current.scrollHeight - wrapperRef.current.clientHeight;
      const percentageScrolled =
        (contentRef.current.scrollTop / scrollableHeight) * 100;
      scrollBarRef.current.style.height = `${percentageScrolled}%`;
    };

    useEffect(() => {
      setIsMobile(width < 768);
    }, [width]);

    useEffect(() => {
      setMaxHeight(height - 58);
    }, [height]);

    useEffect(() => {
      if (isMobile) return;
      fillScroll();
    }, [isSticky, isMobile]);

    useEffect(() => {
      if (isMobile) return undefined;
      let contentTotalHeight = contentRef.current.scrollHeight;
      let wrapperFromTop = wrapperRef.current.getBoundingClientRect().top;
      let wrapperHeight = Math.ceil(height - wrapperFromTop);

      let smallestNumber = getSmallestNumber([
        wrapperHeight,
        contentTotalHeight,
        maxHeight,
      ]);
      wrapperRef.current.style.height = `${smallestNumber}px`;

      const handleScroll = () => {
        contentTotalHeight = contentRef.current.scrollHeight;
        wrapperFromTop = wrapperRef.current.getBoundingClientRect().top;
        wrapperHeight = Math.ceil(height - wrapperFromTop);
        // Use the smallest number between: height of main content, page height minus header, and height of wrapper content
        smallestNumber = getSmallestNumber([
          wrapperHeight,
          contentTotalHeight,
          maxHeight,
        ]);
        wrapperRef.current.style.height = `${smallestNumber}px`;

        if (wrapperFromTop <= 56) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      };

      const contentCopy = contentRef.current;
      contentCopy.addEventListener('scroll', fillScroll);
      window.addEventListener('scroll', handleScroll);
      return () => {
        contentCopy.removeEventListener('scroll', fillScroll);
        window.removeEventListener('scroll', handleScroll);
      };
    }, [height, width, maxHeight, isMobile]);

    const ScrollBar = React.memo(() => (
      <div className={styles['scroll-bar']}>
        <div ref={scrollBarRef} className={styles['scroll-bar__fill']} />
      </div>
    ));

    ScrollBar.displayName = 'ScrollBar';

    const Desktop = () => (
      <div
        ref={wrapperRef}
        className={handleClassName([
          className || '',
          styles['side-content'],
          isSticky ? 'sticky' : '',
        ])}
      >
        <ScrollBar />
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
    );

    const Mobile = () => (
      <div ref={contentRef} className={className || ''}>
        {children}
      </div>
    );

    return <>{isMobile ? <Mobile /> : <Desktop />}</>;
  }
);

SideContent.displayName = 'SideContent';
export default SideContent;
