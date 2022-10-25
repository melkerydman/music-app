import TrackPage from '../../components/pages/TrackPage/TrackPage';
import { getAlbum, getTrack } from '../../utilities/services/spotify';

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
  const spotifyTrack = await getTrack(context.params.trackId, token);
  const albumId = spotifyTrack.album.id;
  const spotifyAlbum = await getAlbum(albumId, token);
  const spotifyTrackFeatures = await getTrackFeatures(
    context.params.trackId,
    token
  );
  const isrc = spotifyTrack.external_ids.isrc;
  const lyrics = await getLyrics(isrc);

  return {
    props: {
      album: spotifyAlbum,
      track: spotifyTrack,
      features: spotifyTrackFeatures,
      lyrics,
    },
  };
}
