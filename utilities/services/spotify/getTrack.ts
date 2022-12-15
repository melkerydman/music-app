import { Track } from '../../../types/track';

const getTrack = async (id, accessToken) => {
  const defaultSpotifyUrl = 'https://api.spotify.com/v1';
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${defaultSpotifyUrl}/tracks/${id}`;

  // TODO: Use axios instead of fetch
  // TODO: Validate response
  const result = await fetch(url, { headers })
    .then((response) => response.json())
    .then((data: Track) => data);

  return result;
};

export default getTrack;
