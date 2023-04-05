export default (current_track) => {
  const song = document.querySelector(`#songs tr[data-id="${current_track.id}"]`);

  let album;
  let artists;
  let title;

  if (song) {
    ({ album, artists, title } = song.dataset);
  } else {
    artists = current_track.artists.map((e) => e.name).join(', ');
    title = `${current_track.name} #Chimera`;
  }

  const songInformation = document.getElementById('current-song');

  songInformation.classList.remove('tape');

  const { children } = songInformation;

  children[0].innerHTML = title;
  children[1].innerHTML = artists + (album ? ` — ${album}` : '');

  const albumArtwork = document.getElementById('album-artwork');

  albumArtwork.style.backgroundImage = `url(${current_track.album.images.sort((a, b) => a.width - b.width)[0].url})`;
  albumArtwork.style.backgroundSize = '100%';
};
