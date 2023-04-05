import utils from '../../utils/index.js';

export default () => {
  const songs = Array.from(document.getElementById('songs').rows).filter((e) => !e.hidden);

  const milliseconds = songs.map((e) => +e.dataset.duration_ms).reduce((a, c) => a + c, 0);
  const seconds = Math.floor(milliseconds / 1000);

  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);

  const innerHTML = [utils.stringOfRowCount('song', songs.length)];

  if (days) {
    innerHTML.push(utils.stringOfRowCount('day', days));
  }

  if (hours) {
    innerHTML.push(utils.stringOfRowCount('hour', hours));
  }

  if (minutes && !days) {
    innerHTML.push(utils.stringOfRowCount('minute', minutes));
  }

  document.querySelector('#status-bar').innerHTML = innerHTML.join(', ');
};
