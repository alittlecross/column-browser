const albumData = () => {
  const albumsTable = document.getElementById('albums');
  const visibleAlbums = new Set(Array.from(document.getElementById('songs').rows).filter((e) => !e.hidden).map((e) => e.dataset.album));

  Array.from(albumsTable.rows).forEach((e, i) => {
    e.hidden = false;

    if (i && !visibleAlbums.has(e.dataset.album)) {
      e.hidden = true;
    }
  });

  albumsTable.parentElement.scrollTop = 0;
};

const songData = () => {
  const albumsTrActive = document.querySelector('#albums tr.active, #albums tr.inactive');
  const artistsTrActive = document.querySelector('#artists tr.active, #artists tr.inactive');
  const isAllAlbums = albumsTrActive.isSameNode(document.getElementById('all-albums'));
  const isAllArtists = artistsTrActive.isSameNode(document.getElementById('all-artists'));
  const songsTable = document.getElementById('songs');

  Array.from(songsTable.rows).forEach((e) => {
    e.hidden = false;

    if (!isAllArtists) {
      if (!e.dataset.artists.includes(artistsTrActive.dataset.artist)) {
        e.hidden = true;
      }
    }

    if (!isAllAlbums) {
      if (e.dataset.album !== albumsTrActive.dataset.album) {
        e.hidden = true;
      }
    }
  });

  songsTable.parentElement.scrollTop = 0;
};

export default {
  albumData,
  songData,
};
