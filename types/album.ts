import { Artist } from './artist';

interface Image {
  height: number;
  url: string;
  width: number;
}

interface ExternalUrls {
  spotify: string;
}

export interface Album {
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
