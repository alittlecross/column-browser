import utils from '../utils/index.js';

const getUris = (element) => {
  const songs = Array.from(document.getElementById('songs').rows).filter((e) => !e.hidden).map((e) => e.dataset.id);

  return songs.slice(songs.indexOf(element.dataset.id), songs.indexOf(element.dataset.id) + 300).map((e) => `spotify:track:${e}`);
};

export default async (element) => {
  await SpotifyPlayer.activateElement();

  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify({
      uris: getUris(element),
    }),
    headers: {
      Authorization: `Bearer ${utils.getCookie('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  const playPause = document.getElementById('play-pause');

  if (!playPause.classList.contains('pause')) {
    playPause.classList.remove('play');
    playPause.classList.add('pause');
  }

  await SpotifyPlayer.resume();
};
