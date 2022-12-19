import {
  Display,
  Heading,
  Paragraph,
} from '../components/Typography/Typography';
import Header from '../components/Header/Header';
import PageSection from '../components/PageSection/PageSection';

export default function Home() {
  return (
    <>
      <Header />
      <PageSection>
        <Display as="h1" weight="bold">
          Display
        </Display>
        <Display as="h1" small>
          Display
        </Display>
        <Heading as="h1">Heading</Heading>
        <Heading as="h2">Heading</Heading>
        <Heading as="h3">Heading</Heading>
        <Heading as="h4">Heading</Heading>
        <Heading as="h5">Heading</Heading>
        <Heading as="h6">Heading</Heading>
        <Paragraph>Paragraph</Paragraph>
        <Paragraph sans weight="bold">
          Paragraph sans
        </Paragraph>
        <Paragraph small>Paragraph small</Paragraph>
      </PageSection>
    </>
  );
}
