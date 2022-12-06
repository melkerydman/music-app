import { Album } from '../../../types/album';
import { Artist } from '../../../types/artist';
import { Track } from '../../../types/track';
import { getStringBetween } from '../../helpers';

// TODO: Create proper type somewhere
type SearchResults = {
  href: string;
  items: Album[] | Artist[] | Track[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
};

// TODO: Remove this?
type Props = {
  accessToken: string;
  query?: string;
  type?: 'album,artist,track' | 'album' | 'artist' | 'track';
  limit?: number;
  offset?: number;
  next?: string;
};

const searchSpotify = async (
  accessToken,
  query?,
  next?,
  type = 'album,artist,track',
  limit = 10
) => {
  const defaultSpotifyUrl = 'https://api.spotify.com/v1';
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const url =
    next ||
    `${defaultSpotifyUrl}/search?q=${query}&type=${type}&limit=${limit}`;

  const t = getStringBetween(url, 'type=', '&');

  // TODO: Use axios instead of fetch
  // TODO: Validate response
  return fetch(url, { headers })
    .then((response) => response.json())
    .then((data) => {
      const {
        albums,
        artists,
        tracks,
      }: {
        albums: SearchResults;
        artists: SearchResults;
        tracks: SearchResults;
      } = data;

      let formattedTracks = [];
      if (tracks?.items.length > 0) {
        formattedTracks = tracks.items.map((track) => ({
          href: track.href,
          heading: track.name,
          subHeading: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          type: track.type,
          id: track.id,
        }));
        if (t === 'track')
          return { tracks: { items: formattedTracks, next: tracks.next } };
      }
      let formattedArtists = [];
      if (artists?.items.length > 0) {
        formattedArtists = artists.items.map((artist) => ({
          href: artist.href,
          heading: artist.name,
          image: artist.images[2]?.url,
          type: artist.type,
          id: artist.id,
        }));
        if (t === 'artist')
          return { artists: { items: formattedArtists, next: artists.next } };
      }

      let formattedAlbums = [];
      if (albums?.items.length > 0) {
        formattedAlbums = albums.items.map((album) => ({
          href: album.href,
          heading: album.name,
          subHeading: album.artists.map((artist) => artist.name),
          image: album.images[2].url,
          type: album.type,
          id: album.id,
        }));
        if (t === 'album')
          return { albums: { items: formattedAlbums, next: albums.next } };
      }

      // TODO: Make sure this actually works
      const topResult =
        formattedTracks[0] || formattedArtists[0] || formattedAlbums[0];

      return {
        topResult,
        tracks: { items: formattedTracks, next: tracks.next },
        artists: { items: formattedArtists, next: artists.next },
        albums: { items: formattedAlbums, next: albums.next },
      };
    });
};

export default searchSpotify;
