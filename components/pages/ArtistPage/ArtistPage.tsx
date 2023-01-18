type DataType = {
  artist: SpotifyApi.ArtistObjectFull;
};

type Props = {
  data: DataType;
};

// eslint-disable-next-line arrow-body-style
const ArtistPage = ({ data }: Props) => {
  const { artist } = data;
  console.log('artist 🔴', artist);
  return <div>In progress</div>;
};

export default ArtistPage;
