import { GetServerSideProps } from 'next';

import { ArtistPage } from '../../components/pages';
import { getArtist, getTokenServer } from '../../utilities/services/spotify';

import Header from '../../components/Header/Header';

// TODO: Type props
const Artist = (props) => (
  <>
    <Header />
    <ArtistPage data={props} />
  </>
);

export default Artist;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getTokenServer(context);

  // TODO: Entire track is already stored in state at this stage if I find a way of grabbing that one instead
  const spotifyArtist = await getArtist(context.params.artistId, token);

  return {
    props: {
      artist: spotifyArtist,
    },
  };
};
