import getTrack from '../../utilities/services/spotify/getTrack';

import TrackPage from '../../components/pages/TrackPage/TrackPage';

import getTrackFeatures from '../../utilities/services/spotify/getTrackFeatures';
import getLyrics from '../../utilities/services/musixmatch/getLyrics';
import Header from '../../components/Header/Header';

import { getTokenServer } from '../../utilities/helpers/getToken';

// TODO: Type props
const Track = (props) => {
  return (
    <>
      <Header />
      <TrackPage data={props} />
    </>
  );
};

export default Track;

export async function getServerSideProps(context) {
  const token = await getTokenServer(context);
  const spotifyTrackData = await getTrack(context.params.trackId, token);
  const spotifyTrackFeatures = await getTrackFeatures(
    context.params.trackId,
    token
  );
  const isrc = spotifyTrackData.external_ids.isrc;
  const lyrics = await getLyrics(isrc);

  return {
    props: {
      data: spotifyTrackData,
      features: spotifyTrackFeatures,
      lyrics,
    },
  };
}
