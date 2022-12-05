import { useEffect, useState } from 'react';
import useStore from '../../../store/useStore';
import { getTokenClient } from '../../../utilities/services/spotify';
import searchSpotify from '../../../utilities/services/spotify/searchSpotify';
import { Heading } from '../../Typography/Typography';
import ListItem from '../ListItem/ListItem';
import styles from './ListItems.module.scss';

// TODO: Create proper type in types
type QuickSearchType = {
  href: string;
  image: string;
  heading: string;
  subHeading?: string[];
  type: string;
  id: string;
};

type Props = {
  data: QuickSearchType[];
  heading: string;
  collapsible?: boolean;
};

const ListItems = ({ data, heading, collapsible, ...rest }: Props) => {
  const [accessToken, setAccessToken] = useState('');

  const searchResults = useStore((state) => state.search.searchResults);
  const addSearchResults = useStore((state) => state.search.addSearchResults);
  const activeCategory = useStore((state) => state.search.activeCategory);
  const setActiveCategory = useStore((state) => state.search.setActiveCategory);

  // TODO: Find another way of ahndling the access token, this is duplicate code from "Search.tsx"
  // TODO: Should probably find a way of storing the token in global state or something similiar, with a timeout set to run before the token expires.
  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenClient();
      setAccessToken(token);
    };
    getToken();
  }, []);

  const handleClick = (type) => {
    if (type !== activeCategory) {
      return setActiveCategory(type);
    }
    return setActiveCategory(null);
  };

  const fetchMore = async (type: string) => {
    try {
      const searchResult = await searchSpotify(
        accessToken,
        '',
        searchResults[type].next
      );
      addSearchResults(searchResult, type);
    } catch (err) {
      setAccessToken(await getTokenClient());
    }
  };

  const Header = () => (
    // TODO: Create class
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      <Heading as="h4">{heading}</Heading>
      {collapsible && (
        <button onClick={() => handleClick(heading.toLowerCase())}>
          {heading.toLowerCase() !== activeCategory
            ? `Show more ${heading.toLowerCase()}`
            : `Show fewer ${heading.toLowerCase()}`}
        </button>
      )}
    </div>
  );

  const initialRenderAmount = heading.toLowerCase() === 'tracks' ? 7 : 3;
  const Items = () => (
    <ul
      className={
        heading.toLowerCase() !== activeCategory && activeCategory !== null
          ? styles.hidden
          : ''
      }
    >
      {activeCategory === null
        ? data
            .slice(0, initialRenderAmount)
            .map((item, index) => (
              <ListItem key={index} content={item}></ListItem>
            ))
        : data.map((item, index) => (
            <ListItem key={index} content={item}></ListItem>
          ))}
    </ul>
  );

  return (
    <li className={styles.items} {...rest}>
      <Header />
      <Items />
      {heading.toLowerCase() === activeCategory && (
        <button onClick={() => fetchMore(heading.toLowerCase())}>
          Load more {heading.toLowerCase()}{' '}
        </button>
      )}
    </li>
  );
};

export default ListItems;
