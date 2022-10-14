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
  type: 'album';
  uri: string;
}
