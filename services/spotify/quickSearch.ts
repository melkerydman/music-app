const quickSearch = async (string, accessToken) => {
  const defaultSpotifyUrl = 'https://api.spotify.com/v1';
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const query = string;
  const type = 'track,artist,album';
  const limit = 10;
  const url = `${defaultSpotifyUrl}/search?q=${query}&type=${type}&limit=${limit}`;

  // TODO: Use axios instead of fetch
  // TODO: Validate response
  return await fetch(url, { headers })
    .then((response) => response.json())
    .then((data) => {
      const maxTracks = 7;
      const maxArtists = 3;
      const maxAlbums = 3;

      let tracks = [];
      if (data.tracks.items.length > 0) {
        tracks = data.tracks.items.slice(0, maxTracks).map((track) => {
          return {
            href: track.href,
            heading: track.name,
            subHeading: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            type: track.type,
            id: track.id,
          };
        });
      }
      let artists = [];
      if (data.artists.items.length > 0) {
        artists = data.artists.items.slice(0, maxArtists).map((artist) => {
          return {
            href: artist.href,
            heading: artist.name,
            image: artist.images[2]?.url,
            type: artist.type,
            id: artist.id,
          };
        });
      }

      let albums = [];
      if (data.albums.items.length > 0) {
        albums = data.albums.items.slice(0, maxAlbums).map((album) => {
          return {
            href: album.href,
            heading: album.name,
            subHeading: album.artists.map((artist) => artist.name),
            image: album.images[2].url,
            type: album.type,
            id: album.id,
          };
        });
      }

      // TODO: Make sure this actually works
      let topResult = tracks[0] || artists[0] || albums[0];
      return { topResult, tracks, artists, albums };
    });
};

export default quickSearch;
