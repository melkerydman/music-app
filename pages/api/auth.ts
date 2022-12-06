// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts

import { GetSpotifyAuthToken } from '../../utilities/services/spotify/getAccessToken';

export default async function handler(_, res) {
  try {
    const data = await GetSpotifyAuthToken();
    if (data.status === 400) res.status(400).json(data);
    res.status(200).json(data);
    // TODO: res.status(200).json(data) instead of above?
  } catch {
    res.status(500).json({ status: 500, message: 'Internal server error.' });
  }
}
