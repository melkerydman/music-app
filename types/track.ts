export interface Track {
  album: Album;
  artists: Artist[];
  availableMarkets: string[];
  discNumber: number;
  durationMS: number;
  explicit: boolean;
  externalIDS: ExternalIDS;
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  isLocal: boolean;
  name: string;
  popularity: number;
  previewURL: string;
  trackNumber: number;
  type: 'track';
  uri: string;
}

interface Album {
  albumType: string;
  artists: Artist[];
  availableMarkets: string[];
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  releaseDate: Date;
  releaseDatePrecision: string;
  totalTracks: number;
  type: string;
  uri: string;
}

interface Artist {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface ExternalIDS {
  isrc: string;
}
