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
        <Display small>Not really done yet</Display>
        <Heading as="h5" weight="thin" className={styles['sub-heading']}>
          But try searching for your favourite song
        </Heading>
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
        <Display small>yet</Display>
      </NewGrid>
      <NewGrid item>
        <Heading as="h5" weight="thin" className={styles['sub-heading']}>
          But try searching for your favourite song
        </Heading>
      </NewGrid>
    </NewGrid>
  );
  const Content = () => (
    <NewGrid container className={styles.content}>
      <NewGrid item sm={6}>
        {/* <Heading className="h5" as="h4">
          About
        </Heading> */}

        <Paragraph>
          {`A work in progress, all-in-one tool for musicians - collecting features that are spread across multiple platforms in one place. `}
          <br />
          <br />
          {`All data provided by Spotify's powerful API, and lyrics provided by Musixmatch.`}
        </Paragraph>
      </NewGrid>
      <NewGrid item sm={6} className={styles.content__last}>
        <Heading className="h5" as="h6">
          Planned features
        </Heading>
        <ul>
          <li className="underline">
            <Paragraph>Various song data and metrics</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Track-synced metronome</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Dynamic auto-scrolling lyrics</Paragraph>
          </li>
          <li className="underline">
            <Paragraph>Customisable display options</Paragraph>
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
