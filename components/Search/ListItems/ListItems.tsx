import { useEffect, useState } from 'react';
import useStore from '../../../store/useStore';
import { handleClassName } from '../../../utilities/helpers';
import { useWindowDimensions } from '../../../utilities/hooks';
import { getTokenClient } from '../../../utilities/services/spotify';
import { fetchNext } from '../../../utilities/services/spotify/searchSpotify';
import { Heading } from '../../Typography/Typography';
import ListItem from '../ListItem/ListItem';
import styles from './ListItems.module.scss';

type Props = {
  data:
    | SpotifyApi.AlbumObjectSimplified[]
    | SpotifyApi.ArtistObjectFull[]
    | SpotifyApi.TrackObjectFull[];
  type: 'album' | 'artist' | 'track';
};

const ListItems = ({ data, type, ...rest }: Props) => {
  const { width } = useWindowDimensions();
  const [accessToken, setAccessToken] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const searchResults = useStore((state) => state.search.searchResults);
  const addSearchResults = useStore((state) => state.search.addSearchResults);
  const activeCategory = useStore((state) => state.search.activeCategory);
  const setActiveCategory = useStore((state) => state.search.setActiveCategory);

  // TODO: Create global state for IsMobile
  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  // TODO: Find another way of ahndling the access token, this is duplicate code from "Search.tsx"
  // TODO: Should probably find a way of storing the token in global state or something similiar, with a timeout set to run before the token expires.
  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenClient();
      setAccessToken(token);
    };
    getToken();
  }, []);

  const handleClick = () => {
    if (type !== activeCategory) {
      return setActiveCategory(type);
    }
    return setActiveCategory(null);
  };

  /* // !INFO: Note the difference between type and category 
        The type will be without s whereas category will be with s, e.g. "track" contra "tracks"  
  */
  const fetchMore = async () => {
    const category = `${type}s`;

    try {
      const searchResult = await fetchNext(
        accessToken,
        searchResults[category].next
      );

      addSearchResults(searchResult, category);
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
      <Heading as="h4">{type}</Heading>
      <button onClick={handleClick}>
        {type !== activeCategory ? 'Expand ->' : 'Collapse <-'}
      </button>
    </div>
  );

  const Items = () => {
    const slicedArray = data.slice(0, 3);

    return (
      <ul className={handleClassName([styles.items])}>
        {activeCategory === null
          ? slicedArray.map((item, index) => (
              <ListItem key={index} content={item}></ListItem>
            ))
          : data.map((item, index) => (
              <ListItem key={index} content={item}></ListItem>
            ))}
      </ul>
    );
  };

  return (
    <li
      className={handleClassName([
        type === activeCategory ? styles.active : '',
        type !== activeCategory && activeCategory !== null ? styles.hidden : '',
        styles.wrapper,
        isMobile ? styles.mobile : '',
      ])}
      {...rest}
    >
      <Header />
      <Items />
      {type === activeCategory && (
        <button onClick={fetchMore}>Load more {`${type}s`}</button>
      )}
    </li>
  );
};

export default ListItems;
