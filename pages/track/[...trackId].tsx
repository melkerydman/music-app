import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import getTrack from '../../services/spotify/getTrack';

import { Heading } from '../../components/Typography/Typography';
import getTrackFeatures from '../../services/spotify/getTrackFeatures';
import getLyrics from '../../services/musixmatch/getLyrics';

const Track = ({ trackData, trackFeatures, lyrics }) => {
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
  const isrc = spotifyTrackData.external_ids.isrc;
  const lyrics = await getLyrics(isrc);

  return {
    props: {
      trackData: spotifyTrackData,
      trackFeatures: spotifyTrackFeatures,
      lyrics: lyrics,
    },
  };
}
