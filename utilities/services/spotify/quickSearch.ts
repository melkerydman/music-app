import { Album } from '../../../types/album';
import { Artist } from '../../../types/artist';
import { Track } from '../../../types/track';

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
      const albums = data.albums.items as Album[];
      const artists = data.artists.items as Artist[];
      const tracks = data.tracks.items as Track[];
      const maxTracks = 7;
      const maxArtists = 3;
      const maxAlbums = 3;

      let formattedTracks = [];
      if (tracks.length > 0) {
        formattedTracks = tracks.slice(0, maxTracks).map((track) => {
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
      let formattedArtists = [];
      if (artists.length > 0) {
        formattedArtists = artists.slice(0, maxArtists).map((artist) => {
          return {
            href: artist.href,
            heading: artist.name,
            image: artist.images[2]?.url,
            type: artist.type,
            id: artist.id,
          };
        });
      }

      let formattedAlbums = [];
      if (albums.length > 0) {
        formattedAlbums = albums.slice(0, maxAlbums).map((album) => {
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
      let topResult =
        formattedTracks[0] || formattedArtists[0] || formattedAlbums[0];
      return {
        topResult,
        tracks: formattedTracks,
        artists: formattedArtists,
        albums: formattedAlbums,
      };
    });
};

export default quickSearch;
