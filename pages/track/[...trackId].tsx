import { useSpotifyAuth } from '../../utilities/hooks/useSpotifyAuth';
import getTrack from '../../utilities/services/spotify/getTrack';

import { Heading, Paragraph } from '../../components/Typography/Typography';
import getTrackFeatures from '../../utilities/services/spotify/getTrackFeatures';
import getLyrics from '../../utilities/services/musixmatch/getLyrics';
import Header from '../../components/Header/Header';

// TODO: Remove "styles" and create a layout component for TrackPage instead
import styles from './track.module.scss';

// TODO: Type props
const Track = ({ trackData, trackFeatures, lyrics }) => {
  const artists = trackData.artists.map((artist) => artist.name);

  return (
    <>
      <Header />
      <div>
        <Heading as="h1">{trackData.name}</Heading>;
        <Heading as="h3">{artists.join(', ')}</Heading>;
        <Paragraph className={styles.lyrics} as="span">
          {lyrics.lyrics_body}
        </Paragraph>
      </div>
    </>
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
