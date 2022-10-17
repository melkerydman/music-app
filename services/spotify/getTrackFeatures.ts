import { TrackFeatures } from '../../types/trackFeatures';

const getTrackFeatures = async (id, accessToken) => {
  const defaultSpotifyUrl = 'https://api.spotify.com/v1';
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${defaultSpotifyUrl}/audio-features/${id}`;

  // TODO: Use axios instead of fetch
  // TODO: Validate response
  return await fetch(url, { headers })
    .then((response) => response.json())
    .then((data: TrackFeatures) => {
      return data;
    });
};

export default getTrackFeatures;
