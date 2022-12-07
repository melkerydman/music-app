import TrackPage from '../../components/pages';
import {
  getAlbum,
  getTrack,
  getTokenServer,
} from '../../utilities/services/spotify';

import getTrackFeatures from '../../utilities/services/spotify/getTrackFeatures';
import getLyrics from '../../utilities/services/musixmatch/getLyrics';
import Header from '../../components/Header/Header';

// TODO: Type props
const Track = (props) => (
  <>
    <Header />
    <TrackPage data={props} />
  </>
);

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
  const { isrc } = spotifyTrack.external_ids;
  const lyrics = await getLyrics(isrc);
  console.log('lyrics 🔴', lyrics);

  return {
    props: {
      album: spotifyAlbum,
      track: spotifyTrack,
      features: spotifyTrackFeatures,
      lyrics: lyrics !== undefined ? lyrics : null,
    },
  };
}
