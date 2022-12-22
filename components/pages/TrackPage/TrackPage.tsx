// import useHeaderStore from '../../../store/useHeaderStore';
import {
  Album,
  Lyrics as LyricsType,
  Track,
  TrackFeatures,
} from '../../../types';
import {
  formatDuration,
  formatKey,
  formatMode,
  formatTempo,
  formatTimeSignature,
} from '../../../utilities/helpers';
import Data from '../../Data/Data';
import PageHeader from '../../layout/PageHeader/PageHeader';
import PageSection from '../../layout/PageSection/PageSection';
import TrackList from '../../TrackList/TrackList';
import Lyrics from './Lyrics/Lyrics';
import NewGrid from '../../NewGrid/NewGrid';
import AlbumInfo from './AlbumInfo/AlbumInfo';

// import styles from './TrackPage.module.scss';

type DataType = {
  album: Album;
  track: Track;
  features: TrackFeatures;
  lyrics: LyricsType;
};

type Props = {
  data: DataType;
};

// TODO: Proper class names
const TrackPage = ({ data }: Props) => {
  const { album, track, features, lyrics } = data;
  // TODO: Remove headerheight completely?
  // const headerHeight = useHeaderStore((props) => props.height);

  const gridItems = [
    {
      title: 'Tempo',
      value: formatTempo(features.tempo),
      description: `Double speed -> ${features.tempo * 2}
      Half speed -> ${features.tempo / 2}`,
    },
    {
      title: 'Key',
      value: `${formatKey(features.key)} ${formatMode(features.mode)}`,
      description: '',
    },
    {
      title: 'Time Signature',
      value: formatTimeSignature(features.time_signature),
      description: '',
    },
    {
      title: 'Duration',
      value: formatDuration(features.duration_ms),
      description: '',
    },
  ];

  return (
    <>
      <PageSection>
        <PageHeader
          image={album.images[0]}
          heading={track.name}
          subHeading={track.artists.map((artist) => artist.name).join(', ')}
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
          <NewGrid item sm={3}>
            <AlbumInfo album={album}></AlbumInfo>
            <TrackList tracks={album.tracks.items} />
          </NewGrid>
          <NewGrid item sm={9}>
            <Lyrics data={{ lyrics }} />
          </NewGrid>
        </NewGrid>
      </PageSection>
    </>
  );
};
export default TrackPage;
