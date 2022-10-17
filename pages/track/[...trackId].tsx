import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import getTrack from '../../services/spotify/getTrack';

import { Heading } from '../../components/Typography/Typography';

const Track = ({ spotifyTrackData }) => {
  console.log('spotifyData 🔴', spotifyTrackData.artists);
  const artists = spotifyTrackData.artists.map((artist) => artist.name);
  return (
    <div>
      <Heading as="h1">{spotifyTrackData.name}</Heading>;
      <Heading as="h3">{artists.join(', ')}</Heading>;
    </div>
  );
};

export default Track;

export async function getServerSideProps(context) {
  const accessToken = await useSpotifyAuth();
  const spotifyTrackData = await getTrack(context.params.trackId, accessToken);
  console.log('track 🟢', spotifyTrackData);
  return {
    props: { spotifyTrackData },
  };
}
