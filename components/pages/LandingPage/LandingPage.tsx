// import useHeaderStore from '../../../store/useHeaderStore';
import { useEffect, useState } from 'react';
import { handleClassName } from '../../../utilities/helpers';
import { useWindowDimensions } from '../../../utilities/hooks';
import PageSection from '../../layout/PageSection/PageSection';
import NewGrid from '../../NewGrid/NewGrid';
import { Display, Heading, Paragraph } from '../../Typography/Typography';

import styles from './LandingPage.module.scss';

// TODO: Proper class names
const TrackPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  const MobileHeader = () => (
    <NewGrid container className={styles.header__mobile}>
      <NewGrid item>
        <Display small>Not really done yet.</Display>
      </NewGrid>
    </NewGrid>
  );
  const DesktopHeader = () => (
    <NewGrid
      container
      className={handleClassName([styles.header__desktop, 'underline'])}
    >
      <NewGrid item span={3}>
        <Display small>Not</Display>
      </NewGrid>
      <NewGrid item span={3}>
        <Display small>really</Display>
      </NewGrid>
      <NewGrid item span={3}>
        <Display small>done</Display>
      </NewGrid>
      <NewGrid item span={3}>
        <Display small>yet.</Display>
      </NewGrid>
    </NewGrid>
  );
  const Content = () => (
    <NewGrid container className={styles.content}>
      <NewGrid item sm={6}>
        <Heading className="h5" as="h4">
          About
        </Heading>

        <Paragraph>
          {`We are thrilled to introduce you to a dynamic and evolving platform
          that will be your go-to destination for all things music. Our site is
          a work in progress, and we can't wait to show you what we've been
          working on. We're building a one-stop shop for all the essential tools
          that you need to elevate your playing and take your skills to the next
          level. Powered by Spotify and Musixmatch, you can expect a seamless
          integration with their services and a wealth of resources at your
          fingertips. So, whether you're a beginner or a seasoned pro, we're
          here to help you on your musical journey. Join us and let's make
          beautiful music together!`}
        </Paragraph>
      </NewGrid>
      <NewGrid item sm={6} className={styles.content__last}>
        <Heading className="h5" as="h4">
          Features
        </Heading>
        <ul>
          <li className="underline">
            <Paragraph>Track-synced metronome</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Dynamic auto-scrolling lyrics</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Customisable display options</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Data powered by Spotify API</Paragraph>
          </li>
        </ul>
      </NewGrid>
    </NewGrid>
  );

  return (
    <>
      <PageSection>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </PageSection>
      <PageSection>
        <Content />
      </PageSection>
    </>
  );
};
export default TrackPage;
