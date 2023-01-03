import Image from 'next/future/image';

type DataType = {
  artist: SpotifyApi.ArtistObjectFull;
};

type Props = {
  data: DataType;
};

// eslint-disable-next-line arrow-body-style
const ArtistPage = ({ data }: Props) => {
  return (
    <div>
      <div>
        <Image
          src={data.artist.images[1].url}
          height={data.artist.images[1].height}
          width={data.artist.images[1].width}
          alt={data.artist.name}
        ></Image>
        {data.artist.name}
      </div>
      {data.artist.genres.join(',')}
    </div>
  );
};

export default ArtistPage;
