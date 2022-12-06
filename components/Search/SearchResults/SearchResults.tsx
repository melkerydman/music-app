import useStore from '../../../store/useStore';
import ListItems from '../ListItems/ListItems';

import styles from './SearchResults.module.scss';

// TODO: Create real types somewhere - or remove these completely?
// type QuickSearchType = {
//   href: string;
//   image: string;
//   heading: string;
//   subHeading?: string[];
//   type: string;
//   id: string;
// };
// TODO: Remove this?
// type Props = {
//   topResult?: QuickSearchType;
//   albums?: QuickSearchType[];
//   artists?: QuickSearchType[];
//   tracks?: QuickSearchType[];
// };

const SearchResults = () => {
  const searchResultsFromStore = useStore(
    (state) => state.search.searchResults
  );

  const { topResult, albums, artists, tracks } = searchResultsFromStore;

  // TODO: Maybe clean up and break out components. Better handling of empty result?
  if (
    !topResult &&
    albums.items.length === 0 &&
    artists.items.length === 0 &&
    tracks.items.length === 0
  ) {
    return (
      <ul className={styles['search-results']}>
        <li>No results found.</li>
      </ul>
    );
  }

  return (
    <ul className={styles['search-results']}>
      {/* // TODO: Why is this tracks.length here? */}
      {tracks.items.length > 0 ||
        artists.items.length > 0 ||
        (albums.items.length > 0 && (
          <ListItems data={[topResult]} heading="Top Result" />
        ))}
      {tracks.items.length > 0 && (
        <ListItems data={tracks.items} heading="Tracks" collapsible />
      )}
      {artists.items.length > 0 && (
        <ListItems data={artists.items} heading="Artists" collapsible />
      )}
      {albums.items.length > 0 && (
        <ListItems data={albums.items} heading="Albums" collapsible />
      )}
    </ul>
  );
};

export default SearchResults;
