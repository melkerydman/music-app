import { useEffect, useState } from 'react';
import { handleClassName } from '../../../utilities/helpers';
import {
  getArtistsAlbums,
  getTokenClient,
} from '../../../utilities/services/spotify';
import Grid from '../../Grid/Grid';
import PageHeader from '../../layout/PageHeader/PageHeader';
import PageSection from '../../layout/PageSection/PageSection';

import styles from './AlbumPage.module.scss';
import MoreAlbums from './MoreAlbums/MoreAlbums';
import Tracklist from './Tracklist/Tracklist';

type Data = {
  album: SpotifyApi.AlbumObjectFull;
};

type Props = {
  data: Data;
};

const AlbumPage = ({ data }: Props) => {
  const { album } = data;
  const {
    name,
    artists,
    images,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    total_tracks,
    tracks,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    release_date,
    label,
  } = album;

  const gridItems = [
    {
      title: 'Tracks',
      value: total_tracks.toString() || 'Unknown',
      description: '',
    },
    {
      title: 'Release date',
      value: release_date || 'Unknown',
      description: '',
    },
    { title: 'Label', value: label || 'Unknown', description: '' },
    { title: 'Label', value: label || 'Unknown', description: '' },
  ];

  const [artistsAlbums, setArtistsAlbumslbums] = useState(null);

  // TODO: Finish partially created authentication hook
  useEffect(() => {
    const fetchAlbumsOnLoad = async () => {
      const token = await getTokenClient();
      setArtistsAlbumslbums(await getArtistsAlbums(artists[0].id, token));
    };
    fetchAlbumsOnLoad();
  }, [artists]);

  return (
    <>
      <PageSection border>
        <PageHeader
          image={images[0]}
          heading={name}
          subHeading={artists.map((artist) => artist.name).join(', ')}
        />
      </PageSection>
      <PageSection border>
        <Grid container>
          {gridItems.map((item, index) => (
            <Grid
              item
              key={index}
              title={item.title}
              value={item.value}
              description={item.description}
            />
          ))}
        </Grid>
      </PageSection>
      <PageSection border>
        <div className={handleClassName([styles.grid])}>
          <Tracklist
            className={handleClassName([styles['grid-9']])}
            tracks={tracks.items}
          ></Tracklist>
          {artistsAlbums && (
            <MoreAlbums
              className={styles['grid-3']}
              albums={artistsAlbums.items}
              activeAlbumId={album.id}
            />
          )}
        </div>
      </PageSection>
    </>
  );
};

export default AlbumPage;
