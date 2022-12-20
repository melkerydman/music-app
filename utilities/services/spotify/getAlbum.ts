const getAlbum = async (id, accessToken) => {
  const defaultSpotifyUrl = 'https://api.spotify.com/v1';
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${defaultSpotifyUrl}/albums/${id}`;

  // TODO: Use axios instead of fetch
  // TODO: Validate response
  return fetch(url, { headers })
    .then((response) => response.json())
    .then((data: SpotifyApi.AlbumObjectFull) => data);
};

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-albums
const getArtistsAlbums = async (id, accessToken) => {
  const defaultSpotifyUrl = 'https://api.spotify.com/v1';
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${defaultSpotifyUrl}/artists/${id}/albums?include_groups=album,single&market=SE`;

  // TODO: Use axios instead of fetch
  // TODO: Validate response
  return fetch(url, { headers })
    .then((response) => response.json())
    .then((data: SpotifyApi.AlbumObjectFull[]) => data);
};

export { getAlbum, getArtistsAlbums };
