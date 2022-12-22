import { handleClassName } from '../../utilities/helpers';
import { Heading, Paragraph } from '../Typography/Typography';
import styles from './Data.module.scss';

interface Props {
  title: string;
  value: string;
  description?: string;
}

const Data = ({ title, value, description }: Props) => {
  console.log(' 🔴');

  return (
    <div className={handleClassName([styles.text])}>
      <Heading className={handleClassName([styles.heading])} as="h6">
        {title}
      </Heading>
      <Heading as="h4">{value}</Heading>
      <Paragraph as="p">{description}</Paragraph>
    </div>
  );
};
export default Data;
