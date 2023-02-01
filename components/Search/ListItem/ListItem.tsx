import Image from 'next/future/image';
import Link from 'next/link';
import useStore from '../../../store/useStore';
import { Heading } from '../../Typography/Typography';

import styles from './ListItem.module.scss';

type Props = {
  content:
    | SpotifyApi.AlbumObjectSimplified
    | SpotifyApi.ArtistObjectFull
    | SpotifyApi.TrackObjectFull;
};

const ListItem = ({ content }: Props): JSX.Element => {
  const setSearch = useStore((state) => state.search.setSearch);
  const setIsFocus = useStore((state) => state.search.setIsFocus);
  const setActiveCategory = useStore((state) => state.search.setActiveCategory);

  // TODO: Better way of creating variants of component
  const Item = () => {
    if (content.type === 'album')
      return (
        <li
          onClick={() => {
            setSearch('');
            setActiveCategory(null);
            setIsFocus(null);
          }}
        >
          {/* // TODO: add proper href */}
          <Link href={`/${content.type}/${content.id}`}>
            <a className={styles['list-item']}>
              <Image
                width="44"
                height="44"
                src={content.images[0] ? content.images[0].url : ''}
                alt={content.name}
              />
              <div className={styles.text}>
                <Heading className={styles.heading} as="h5">
                  {content.name}
                </Heading>
                {content.artists && (
                  <Heading className={styles['sub-heading']} as="h6">
                    {content.artists.map((artist) => artist.name).join(', ')}
                  </Heading>
                )}
              </div>
              {/* <div className={content.type}>{content.type} icon</div> */}
            </a>
          </Link>
        </li>
      );

    if (content.type === 'artist')
      return (
        <li
          onClick={() => {
            setSearch('');
            setActiveCategory(null);
            setIsFocus(null);
          }}
        >
          {/* // TODO: add proper href */}
          <Link href={`/${content.type}/${content.id}`}>
            <a className={styles['list-item']}>
              <Image
                width="44"
                height="44"
                src={content.images[0] ? content.images[0].url : ''}
                alt={content.name}
              />
              <div className={styles.text}>
                <Heading className={styles.heading} as="h5">
                  {content.name}
                </Heading>
              </div>
              {/* <div className={content.type}>{content.type} icon</div> */}
            </a>
          </Link>
        </li>
      );
    if (content.type === 'track')
      return (
        <li
          onClick={() => {
            setSearch('');
            setActiveCategory(null);
            setIsFocus(null);
          }}
        >
          {/* // TODO: add proper href */}
          <Link href={`/${content.type}/${content.id}`}>
            <a className={styles['list-item']}>
              <Image
                width="44"
                height="44"
                // TODO: Handle non-existing image better
                src={content.album.images[0] ? content.album.images[0].url : ''}
                alt={content.name}
              />
              <div className={styles.text}>
                <Heading className={styles.heading} as="h5">
                  {content.name}
                </Heading>
                {content.artists && (
                  <Heading className={styles['sub-heading']} as="h6">
                    {content.artists.map((artist) => artist.name).join(', ')}
                  </Heading>
                )}
              </div>
              {/* <div className={content.type}>{content.type} icon</div> */}
            </a>
          </Link>
        </li>
      );
    return null;
  };

  return <Item />;
};

export default ListItem;
