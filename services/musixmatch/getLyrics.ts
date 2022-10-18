import axios from 'axios';

const apiKey = process.env.API_KEY_MUSIXMATCH;
const baseUrl = process.env.MUSIXMATCH_BASE_URL;

// TODO: Add @params description
const getMusixmatchId = async (isrc: string) => {
  const url = `${baseUrl}/track.get?apikey=${apiKey}&track_isrc=${isrc}`;

  return await axios
    .get(url)
    .then((response) => {
      console.log(response.data.message.body.track.track_id);
      return response.data.message.body.track.track_id;
    })
    .catch((error) => {
      console.log(error);
    });
};

// TODO: Add @params description
const getLyrics = async (isrc: string) => {
  const musixmatchId = await getMusixmatchId(isrc);
  const url = `${baseUrl}/track.lyrics.get?apikey=${apiKey}&track_id=${musixmatchId}`;

  return await axios
    .get(url)
    .then((response) => {
      console.log(response.data.message.body.lyrics.lyrics_body);
      return response.data.message.body.lyrics.lyrics_body;
    })
    .catch((error) => {
      console.log('GetLyrics Error: ', error);
    });
};

export default getLyrics;
