import { SearchProvider } from '../store/useSearch';
import '../styles/globals.scss';
import '../styles/helpers.scss';

function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}

export default MyApp;
