let currentTrackId;

export default (current_track, paused, position) => {
  const playbackProgress = document.querySelector('#progress-bar span:nth-child(1)');

  if (currentTrackId !== current_track.id) {
    currentTrackId = current_track.id;
    playbackProgress.classList.remove('progress');

    void playbackProgress.offsetWidth;
  }

  if (paused) {
    playbackProgress.style.animationPlayState = 'paused';
  } else {
    if (!position) {
      playbackProgress.classList.remove('progress');

      void playbackProgress.offsetWidth;

      playbackProgress.classList.add('progress');
      playbackProgress.style.animationDuration = `${current_track.duration_ms}ms`;
    }

    playbackProgress.style.animationPlayState = 'running';
  }
};
