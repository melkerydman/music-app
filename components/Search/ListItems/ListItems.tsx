import { Heading } from '../../Typography/Typography';
import ListItem from '../ListItem/ListItem';
import styles from './ListItems.module.scss';

const ListItems = ({ data, heading }) => (
  <li className={styles.items}>
    <Heading as="h4">{heading}</Heading>
    <ul>
      {data.map((item, index) => (
        <ListItem key={index} content={item}></ListItem>
      ))}
    </ul>
  </li>
);

export default ListItems;
