import styles from './Feature.module.scss';

// TODO: New name
const Spacer = () => {
  return <div className={`${styles['spacer']}`}></div>;
};

type Props = { title: string; value: string };

const Feature = ({ title, value }: Props) => {
  return (
    <div className={styles['feature']}>
      <div className={styles['feature_title']}>[ {title} ]</div>
      <Spacer />
      <div>{value}</div>
    </div>
  );
};

export default Feature;
