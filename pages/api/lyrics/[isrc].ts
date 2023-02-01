// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts

import axios from 'axios';

const apiKey = process.env.MUSIXMATCH_API_KEY;
const baseUrl = process.env.MUSIXMATCH_BASE_URL;

const getMusixmatchId = async (isrc: string) => {
  const url = `${baseUrl}/track.get?apikey=${apiKey}&track_isrc=${isrc}`;

  return axios
    .get(url)
    .then((response) => response.data.message.body.track.track_id)
    .catch((error) => {
      throw new Error(`Failed to get Musixmatch ID: ${error.message}`);
    });
};

const getLyrics = async (isrc: string) => {
  const musixmatchId = await getMusixmatchId(isrc);

  const url = `${baseUrl}/track.lyrics.get?apikey=${apiKey}&track_id=${musixmatchId}`;

  return axios
    .get(url)
    .then((response) => response.data.message)
    .catch((error) => {
      throw new Error(`Failed to get lyrics: ${error.message}`);
    });
};

export default async function handler(req, res) {
  const { isrc } = req.query;
  try {
    const data = await getLyrics(isrc);
    res.status(data.header.status_code).json(data.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal server error.' });
  }
}
