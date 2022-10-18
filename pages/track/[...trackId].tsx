import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import getTrack from '../../services/spotify/getTrack';

import { Heading } from '../../components/Typography/Typography';
import getTrackFeatures from '../../services/spotify/getTrackFeatures';

const Track = ({ trackData, trackFeatures }) => {
  const artists = trackData.artists.map((artist) => artist.name);

  return (
    <div>
      <Heading as="h1">{trackData.name}</Heading>;
      <Heading as="h3">{artists.join(', ')}</Heading>;
    </div>
  );
};

export default Track;

export async function getServerSideProps(context) {
  const accessToken = await useSpotifyAuth();
  const spotifyTrackData = await getTrack(context.params.trackId, accessToken);
  const spotifyTrackFeatures = await getTrackFeatures(
    context.params.trackId,
    accessToken
  );

  return {
    props: { trackData: spotifyTrackData, trackFeatures: spotifyTrackFeatures },
  };
}
