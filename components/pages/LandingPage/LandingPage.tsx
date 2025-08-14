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
        <Display small>Music thing</Display>
      </NewGrid>
    </NewGrid>
  );
  const DesktopHeader = () => (
    <NewGrid container className={handleClassName([styles.header__desktop])}>
      <NewGrid item span={6}>
        <Display small>Music thing</Display>
      </NewGrid>
      <NewGrid item></NewGrid>
    </NewGrid>
  );
  const Content = () => (
    <NewGrid container className={styles.content}>
      <NewGrid item sm={6} className={styles.lol}>
        {/* <Heading className="h5" as="h4">
          About
        </Heading> */}

        <Paragraph>
          {`A work in progress, all-in-one tool for musicians - collecting features that are spread across multiple platforms in one place.*`}
        </Paragraph>

        <Paragraph>
          {`All data provided by Spotify's API, and lyrics provided by Musixmatch.`}
        </Paragraph>

        <Paragraph xs>
          {`* In November 2024 Spotify deprecated the Audio Features endpoint in their API, which provided tempo, key, and other track analysis data that was central to the app's functionality. Oh well!`}
        </Paragraph>
      </NewGrid>
      <NewGrid item sm={6} className={styles.content__last}>
        <Heading className="h5" as="h6">
          Potential features and updates
        </Heading>
        <ul>
          <li className="underline">
            <Paragraph>Alternative Audio Features API</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Artist page</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Multiple auto-scroll settings for lyrics</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Revisit UI</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>...</Paragraph>
          </li>
        </ul>
      </NewGrid>
    </NewGrid>
  );

  return (
    <main className={styles.main}>
      <PageSection>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </PageSection>
      <PageSection>
        <Content />
      </PageSection>
    </main>
  );
};
export default TrackPage;
