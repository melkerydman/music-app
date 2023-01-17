import { useEffect, useState } from 'react';
import {
  getArtistsAlbums,
  getTokenClient,
} from '../../../utilities/services/spotify';
import NewGrid from '../../NewGrid/NewGrid';
import PageHeader from '../../layout/PageHeader/PageHeader';
import PageSection from '../../layout/PageSection/PageSection';
import TrackList from '../../TrackList/TrackList';

import styles from './AlbumPage.module.scss';
import MoreAlbums from './MoreAlbums/MoreAlbums';
import DataItems from '../../DataItems/DataItems';

type DataType = {
  album: SpotifyApi.AlbumObjectFull;
};

type Props = {
  data: DataType;
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

  const dataItems = [
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
  ];

  const [artistsAlbums, setArtistsAlbums] = useState(null);

  // TODO: Finish partially created authentication hook
  useEffect(() => {
    const fetchAlbumsOnLoad = async () => {
      const token = await getTokenClient();
      setArtistsAlbums(await getArtistsAlbums(artists[0].id, token));
    };
    fetchAlbumsOnLoad();
  }, [artists]);

  return (
    <>
      <PageSection>
        <PageHeader
          image={images[0]}
          heading={name}
          subHeading={artists.map((artist) => artist.name).join(', ')}
        />
      </PageSection>
      <PageSection>
        <NewGrid container>
          <NewGrid item sm={8}>
            <TrackList album={album} tracks={tracks.items}></TrackList>
          </NewGrid>
          {artistsAlbums && (
            <NewGrid item sm={4} className={styles.aside}>
              <DataItems title="Album information" items={dataItems} />
              <MoreAlbums
                albums={artistsAlbums.items}
                activeAlbumId={album.id}
              />
            </NewGrid>
          )}
        </NewGrid>
      </PageSection>
    </>
  );
};

export default AlbumPage;
