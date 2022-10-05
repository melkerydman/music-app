import {
  Display,
  Heading,
  Paragraph,
} from '../components/core/Typography/Typography';

export default function Home() {
  return (
    <>
      <Display as="h1">Display</Display>
      <Display as="h1" small>
        Display
      </Display>
      <Heading as="h1">Heading</Heading>
      <Heading as="h2">Heading</Heading>
      <Heading as="h3">Heading</Heading>
      <Heading as="h4">Heading</Heading>
      <Heading as="h5">Heading</Heading>
      <Heading as="h6">Heading</Heading>
      <Paragraph as="p">Paragraph</Paragraph>
      <Paragraph as="p" small>
        Paragraph
      </Paragraph>
    </>
  );
}
