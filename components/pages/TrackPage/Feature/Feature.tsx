import { Paragraph } from '../../../Typography/Typography';
import styles from './Feature.module.scss';

// TODO: New name
const Spacer = () => {
  return <div className={`${styles['spacer']}`}></div>;
};

type Props = { title: string; value: string };

const Feature = ({ title, value }: Props) => {
  return (
    <div className={styles['feature']}>
      <Paragraph as="div" sans small weight="bold">
        [ {title} ]
      </Paragraph>
      <Spacer />
      <Paragraph as="div" sans small weight="thin">
        {value}
      </Paragraph>
    </div>
  );
};

export default Feature;
