import axios from 'axios';

const apiKey = process.env.MUSIXMATCH_API_KEY;
const baseUrl = process.env.MUSIXMATCH_BASE_URL;

// TODO: Add @params description
const getMusixmatchId = async (isrc: string) => {
  const url = `${baseUrl}/track.get?apikey=${apiKey}&track_isrc=${isrc}`;

  return axios
    .get(url)
    .then((response) => response.data.message.body.track.track_id)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

// TODO: Add @params description
const getLyrics = async (isrc: string) => {
  const musixmatchId = await getMusixmatchId(isrc);
  const url = `${baseUrl}/track.lyrics.get?apikey=${apiKey}&track_id=${musixmatchId}`;

  return axios
    .get(url)
    .then((response) => response.data.message.body.lyrics)
    .catch((error) => {
      console.log('GetLyrics Error: ', error);
      return error;
    });
};

export default getLyrics;
