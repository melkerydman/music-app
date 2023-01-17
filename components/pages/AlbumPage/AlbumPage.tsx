import { useEffect, useState } from 'react';
import {
  getArtistsAlbums,
  getTokenClient,
} from '../../../utilities/services/spotify';
import Data from '../../DataItems/DataItems';
import NewGrid from '../../NewGrid/NewGrid';
import PageHeader from '../../layout/PageHeader/PageHeader';
import PageSection from '../../layout/PageSection/PageSection';
import TrackList from '../../TrackList/TrackList';

// import styles from './AlbumPage.module.scss';
import MoreAlbums from './MoreAlbums/MoreAlbums';

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
      <PageSection>
        <PageHeader
          image={images[0]}
          heading={name}
          subHeading={artists.map((artist) => artist.name).join(', ')}
        />
      </PageSection>
      <PageSection>
        <NewGrid container fullBorder>
          {gridItems.map((item, index) => (
            <NewGrid key={index} item xs={6} sm={3}>
              <Data
                title={item.title}
                value={item.value}
                description={item.description}
              />
            </NewGrid>
          ))}
        </NewGrid>
      </PageSection>
      <PageSection>
        <NewGrid container fullBorder>
          {artistsAlbums && (
            <NewGrid item sm={3}>
              <MoreAlbums
                albums={artistsAlbums.items}
                activeAlbumId={album.id}
              />
            </NewGrid>
          )}
          <NewGrid item sm={9}>
            <TrackList tracks={tracks.items}></TrackList>
          </NewGrid>
        </NewGrid>
      </PageSection>
    </>
  );
};

export default AlbumPage;
