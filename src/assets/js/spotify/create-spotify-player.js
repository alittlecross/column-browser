import dom from '../dom/index.js';
import utils from '../utils/index.js';

const state = {
  id: null,
  paused: null,
  position: null,
  timestamp: null,
};

export default () => {
  SpotifyPlayer = new Spotify.Player({
    name: 'Column Browser',
    getOAuthToken: (cb) => { cb(utils.getCookie('access_token')); },
    volume: 1.0,
  });

  SpotifyPlayer.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);

    deviceId = device_id;
  });

  SpotifyPlayer.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  SpotifyPlayer.addListener('player_state_changed', async ({
    paused, position, timestamp, track_window: { current_track },
  }) => {
    if (current_track.id !== state.id || paused !== state.paused || position !== state.position || timestamp - state.timestamp > 1000) {
      console.log('player_state_changed');

      state.id = current_track.id;
      state.paused = paused;
      state.position = position;
      state.timestamp = timestamp;

      await utils.checkExpiryDate();

      dom.update.currentSong(current_track);
      dom.update.progressBar(current_track, paused, position);
      dom.update.songRowIndicator(current_track.id, paused);
    }
  });

  SpotifyPlayer.addListener('autoplay_failed', async ({ message }) => {
    console.error('autoplay_failed', message);
  });

  SpotifyPlayer.addListener('initialization_error', async ({ message }) => {
    console.error('initialization_error', message);
  });

  SpotifyPlayer.addListener('authentication_error', async ({ message }) => {
    console.error('authentication_error', message);
  });

  SpotifyPlayer.addListener('account_error', async ({ message }) => {
    console.error('account_error', message);
  });

  SpotifyPlayer.addListener('playback_error', async ({ message }) => {
    console.error('playback_error', message);
  });

  SpotifyPlayer.connect();
};
