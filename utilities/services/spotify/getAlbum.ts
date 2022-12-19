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

export default getAlbum;
