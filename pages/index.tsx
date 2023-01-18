import Header from '../components/Header/Header';
import PageSection from '../components/layout/PageSection/PageSection';
import LandingPage from '../components/pages/LandingPage/LandingPage';

export default function Home() {
  return (
    <>
      <Header />
      <PageSection>
        <LandingPage />
      </PageSection>
    </>
  );
}
