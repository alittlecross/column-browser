export default (id, paused) => {
  const current = document.querySelector(`#songs tr[data-id="${id}"] td`);
  const playPause = document.getElementById('play-pause');

  if (current) {
    if (paused) {
      current.classList.add('speaker-0');
      current.classList.remove('speaker-2');
      playPause.classList.replace('pause', 'play');
    } else {
      current.classList.add('speaker-2');
      current.classList.remove('speaker-0');
      playPause.classList.replace('play', 'pause');
    }
  }

  Array.from(document.querySelectorAll('.speaker-0, .speaker-2')).forEach((e) => {
    if (id !== e.parentElement.dataset.id) {
      e.classList.remove('speaker-0', 'speaker-2');
    }
  });
};
