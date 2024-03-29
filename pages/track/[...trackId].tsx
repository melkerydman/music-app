import { GetServerSideProps } from 'next';

import { TrackPage } from '../../components/pages';
import {
  getAlbum,
  getTrack,
  getTokenServer,
} from '../../utilities/services/spotify';

import getTrackFeatures from '../../utilities/services/spotify/getTrackFeatures';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// TODO: Type props
const Track = (props) => (
  <>
    <Header />
    <TrackPage data={props} />
    <Footer />
  </>
);

export default Track;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getTokenServer(context);

  // TODO: Entire track is already stored in state at this stage if I find a way of grabbing that one instead
  const spotifyTrack = await getTrack(context.params.trackId, token);
  const albumId = spotifyTrack.album.id;
  const spotifyAlbum = await getAlbum(albumId, token);
  const spotifyTrackFeatures = await getTrackFeatures(
    context.params.trackId,
    token
  );

  return {
    props: {
      album: spotifyAlbum,
      track: spotifyTrack,
      features: spotifyTrackFeatures,
      // lyrics: lyrics !== undefined ? lyrics : null,
    },
  };
};
