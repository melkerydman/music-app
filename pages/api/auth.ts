// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const axios = require('axios');
const qs = require('qs');

// TODO: Look at error handling, as well as whats returned from axios
// TODO: Type

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const GetSpotifyAuthToken = async () => {
  const url = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ grant_type: 'client_credentials' });
  const headers = {
    Authorization:
      'Basic ' +
      Buffer.from(client_id + ':' + client_secret).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return axios
    .post(url, data, { headers })
    .then((response) => {
      return { status: response.status, body: response.data };
    })
    .catch((error) => {
      return {
        status: error.response.status,
        message: error.message,
        body: error.response.data,
      };
    });
};

export default async function handler(req, res) {
  try {
    const data = await GetSpotifyAuthToken();
    if (data.status === 400) res.status(400).json(data);
    res.status(200).json(data);
  } catch {
    res.status(500).json({ status: 500, message: 'Internal server error.' });
  }
}
