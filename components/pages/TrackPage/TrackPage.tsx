// import useHeaderStore from '../../../store/useHeaderStore';
import { Lyrics as LyricsType } from '../../../types';
import {
  formatDuration,
  formatKey,
  formatMode,
  formatTempo,
  formatTimeSignature,
} from '../../../utilities/helpers';
import DataItems from '../../DataItems/DataItems';
import PageHeader from '../../layout/PageHeader/PageHeader';
import PageSection from '../../layout/PageSection/PageSection';
import TrackList from '../../TrackList/TrackList';
import Lyrics from './Lyrics/Lyrics';
import NewGrid from '../../NewGrid/NewGrid';

// import styles from './TrackPage.module.scss';
import Aside from '../../layout/Aside/Aside';

type DataType = {
  album: SpotifyApi.AlbumObjectFull;
  track: SpotifyApi.TrackObjectFull;
  features: SpotifyApi.AudioFeaturesObject;
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

  const dataItems = [
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
        <NewGrid container>
          <NewGrid item sm={8}>
            <Lyrics data={{ lyrics }} />
          </NewGrid>
          <NewGrid item sm={4}>
            <Aside>
              <DataItems title="Track information" items={dataItems} />
              <TrackList simple album={album} tracks={album.tracks.items} />
            </Aside>
          </NewGrid>
        </NewGrid>
      </PageSection>
    </>
  );
};
export default TrackPage;
