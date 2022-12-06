// TODO: LOOK THROUGH THIS ENTIRE FILE AND REFACTOR IT
import axios from 'axios';
import nookies, { parseCookies, setCookie } from 'nookies';
import { AccessSpotify } from '../../../types';

const qs = require('qs');

// TODO: Look at error handling, as well as whats returned from axios
// TODO: Type

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const GetSpotifyAuthToken = async () => {
  console.log('GetSpotifyAuthToken running');

  const url = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ grant_type: 'client_credentials' });
  const headers = {
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64'
    )}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post(url, data, { headers });
    return { status: response.status, body: response.data };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.message,
      body: error.response.data,
    };
  }
};

// TODO: Refactor useSpotifyAuth to be the main function, with getting and setting token cookies within that one instead?
// TODO: Replace with .env url
const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production';

const authenticateClient = () => {
  console.log('authenticateClient running');

  return axios
    .get(`${dev ? 'http://localhost:3000' : ''}/api/auth`)
    .then((res) => res.data.body)
    .catch((error) => error);
};

const authenticateServer = async () => {
  console.log('authenticateServer running');

  const data = await GetSpotifyAuthToken();
  return data.body;
};

// TODO: Refactor into one function where server functionality is run if context is passed and client if its not
const getTokenClient = async () => {
  console.log('getTokenClient running');
  const cookies = parseCookies();
  const { token } = cookies;

  if (token) return token;
  // TODO: Call something else than newToken
  const newToken: AccessSpotify = await authenticateClient();
  console.log('newToken', newToken);
  setCookie(null, 'token', newToken.access_token, {
    maxAge: newToken.expires_in - 10,
    path: '/',
  });

  return newToken.access_token;
};

const getTokenServer = async (context) => {
  console.log('getTokenServer running');
  const cookies = nookies.get(context);
  const { token } = cookies;

  if (token) return token;

  // TODO: Call something else than newToken
  const newToken: AccessSpotify = await authenticateServer();
  nookies.set(context, 'token', newToken.access_token, {
    maxAge: newToken.expires_in - 10,
    path: '/',
  });

  return newToken.access_token;
};

export { getTokenClient, getTokenServer };
