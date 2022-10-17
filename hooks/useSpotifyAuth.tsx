import axios from 'axios';

const url = 'http://localhost:3000/api/auth';

export const useSpotifyAuth = () => {
  return axios
    .get(url)
    .then((res) => res.data.body.access_token)
    .catch((error) => error);
};
