import axios from 'axios';

// TODO: Refactor useSpotifyAuth to be the main function, with getting and setting token cookies within that one instead?
// TODO: Replace with .env url
const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production';
const baseUrl = dev
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_PAGE_URL;

const useSpotifyAuth = () =>
  axios
    .get(`${baseUrl}/api/auth`)
    .then((res) => res.data.body)
    .catch((error) => error);

export default useSpotifyAuth;
