import { GetServerSideProps } from 'next';

import { AlbumPage } from '../../components/pages';
import { getAlbum, getTokenServer } from '../../utilities/services/spotify';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Album = (props) => (
  <>
    <Header />
    <AlbumPage data={props} />
    <Footer />
  </>
);

export default Album;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getTokenServer(context);
  const albumFromSpotify = await getAlbum(context.params.albumId, token);

  return {
    props: {
      album: albumFromSpotify,
    },
  };
};
