import axios from 'axios';
import nookies, { parseCookies, setCookie } from 'nookies';
import { AccessSpotify } from '../../../types';

// TODO: Refactor useSpotifyAuth to be the main function, with getting and setting token cookies within that one instead?
// TODO: Replace with .env url
const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production';

const authenticate = () =>
  axios
    .get(`${dev ? 'http://localhost:3000' : ''}/api/auth`)
    .then((res) => res.data.body)
    .catch((error) => error);

// TODO: Refactor into one function where server functionality is run if context is passed and client if its not
const getTokenClient = async () => {
  const cookies = parseCookies();
  const { token } = cookies;

  if (token) return token;
  // TODO: Call something else than newToken
  const newToken: AccessSpotify = await authenticate();
  setCookie(null, 'token', newToken.access_token, {
    maxAge: newToken.expires_in - 10,
    path: '/',
  });

  return newToken.access_token;
};

const getTokenServer = async (context) => {
  const cookies = nookies.get(context);
  const { token } = cookies;

  if (token) return token;

  // TODO: Call something else than newToken
  const newToken: AccessSpotify = await authenticate();
  nookies.set(context, 'token', newToken.access_token, {
    maxAge: newToken.expires_in - 10,
    path: '/',
  });

  return newToken.access_token;
};

export { getTokenClient, getTokenServer };
