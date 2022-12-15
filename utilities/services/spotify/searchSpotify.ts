export const searchForItem = async (accessToken, query, limit = 10) => {
  const defaultSpotifyUrl = 'https://api.spotify.com/v1';
  const type = 'album,artist,track';

  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${defaultSpotifyUrl}/search?q=${query}&type=${type}&limit=${limit}`;
  return fetch(url, { headers })
    .then((response) => response.json())
    .then((data: SpotifyApi.SearchResponse) => {
      // TODO: Potentially just send data and deconstruct where used instead
      const { albums, artists, tracks } = data;

      return {
        tracks,
        artists,
        albums,
      };
    });
};
export const fetchNext = async (accessToken, next) => {
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  return fetch(next, { headers })
    .then((response) => response.json())
    .then((data: SpotifyApi.SearchResponse) => data);
};
