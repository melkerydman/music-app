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
  handleClassName,
} from '../../../utilities/helpers';
import Grid from '../../Grid/Grid';
import PageHeader from '../../layout/PageHeader/PageHeader';
import PageSection from '../../layout/PageSection/PageSection';
import TrackList from '../../TrackList/TrackList';
import Lyrics from './Lyrics/Lyrics';

// import styles from './TrackPage.module.scss';

type Data = {
  album: Album;
  track: Track;
  features: TrackFeatures;
  lyrics: LyricsType;
};

type Props = {
  data: Data;
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
      description: '',
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
      <PageSection border>
        <PageHeader
          image={album.images[0]}
          heading={track.name}
          subHeading={track.artists.map((artist) => artist.name).join(', ')}
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
        <div className={handleClassName(['grid'])}>
          <div
            className={handleClassName(['grid-item__12', 'grid-item__3:md'])}
          >
            <TrackList tracks={album.tracks.items}></TrackList>
          </div>
          <div
            className={handleClassName(['grid-item__12', 'grid-item__9:md'])}
          >
            <Lyrics data={{ lyrics }} />
          </div>
        </div>
      </PageSection>
    </>
  );
};
export default TrackPage;
