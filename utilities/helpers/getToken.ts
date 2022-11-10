import nookies, { parseCookies, setCookie } from 'nookies';
import { AccessSpotify } from '../../types/accessSpotify';
import { useSpotifyAuth } from '../hooks';

// TODO: Refactor into one function where server functionality is run if context is passed and client if its not
const getTokenClient = async () => {
  const cookies = parseCookies();
  const { token } = cookies;

  if (token) return token;
  // TODO: Call something else than newToken
  const newToken: AccessSpotify = await useSpotifyAuth();
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
  const newToken: AccessSpotify = await useSpotifyAuth();
  nookies.set(context, 'token', newToken.access_token, {
    maxAge: newToken.expires_in - 10,
    path: '/',
  });

  return newToken.access_token;
};

export { getTokenClient, getTokenServer };
