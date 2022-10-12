import { Album } from './album';
import { Artist } from './artist';

interface ExternalUrls {
  spotify: string;
}

interface ExternalIDS {
  isrc: string;
}

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
  previewURL: null;
  trackNumber: number;
  type: string;
  uri: string;
}
