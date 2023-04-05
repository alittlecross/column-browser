const ascendingOrder = {
  album: null,
  artist: null,
  last: null,
  title: null,
};

const alpha = (a, b, factor, field) => (a.dataset[field].localeCompare(b.dataset[field]) * factor);

const numeric = (a, b, factor, field) => (a.dataset[field] - b.dataset[field]) * factor;

const sortSongData = (cb) => {
  const albums = [];
  const tracks = [];

  const songs = document.getElementById('songs');

  Array.from(songs.rows).forEach((e) => {
    (e.dataset.album ? albums : tracks).push(e);
  });

  cb(albums, tracks).forEach((e) => {
    songs.tBodies[0].appendChild(e);
  });

  document.querySelectorAll('#song-headers div').forEach((e) => {
    e.classList.toggle('asc', ascendingOrder[e.id] === true);
    e.classList.toggle('desc', ascendingOrder[e.id] === false);
  });

  songs.parentElement.scrollTop = 0;
};

const album = (toggle = true) => {
  sortSongData((albums, tracks) => {
    const factorAlbum = ascendingOrder.album ? -1 : 1;

    const sorted = [
      ...albums.sort((a, b) => (alpha(a, b, factorAlbum, 'sort_album') || numeric(a, b, factorAlbum, 'disc_number') || numeric(a, b, factorAlbum, 'track_number'))),
      ...tracks.sort((a, b) => alpha(a, b, factorAlbum, 'sort_artists') || alpha(a, b, factorAlbum, 'sort_title')),
    ];

    if (toggle) {
      ascendingOrder.album = !ascendingOrder.album;
      ascendingOrder.artist = null;
      ascendingOrder.last = 'album';
      ascendingOrder.title = null;
    }

    return sorted;
  });
};

const artist = (toggle = true) => {
  sortSongData((albums, tracks) => {
    const factorArtist = ascendingOrder.artist ? -1 : 1;
    const factorTitle = ascendingOrder.title ? -1 : 1;

    const sorted = [
      ...albums,
      ...tracks,
    ].sort((a, b) => alpha(a, b, factorArtist, 'sort_artists') || alpha(a, b, factorTitle, 'sort_title'));

    if (toggle) {
      ascendingOrder.album = null;
      ascendingOrder.artist = !ascendingOrder.artist;
      ascendingOrder.last = 'artist';
      ascendingOrder.title = !ascendingOrder.title;
    }

    return sorted;
  });
};

const resetAscendingOrder = () => {
  ascendingOrder.album = null;
  ascendingOrder.artist = null;
  ascendingOrder.title = null;

  document.querySelectorAll('#song-headers div').forEach((e) => {
    e.classList.remove('asc', 'desc');
  });
};

const title = (toggle = true) => {
  sortSongData((albums, tracks) => {
    const factorTitle = ascendingOrder.title ? -1 : 1;

    const sorted = [
      ...albums,
      ...tracks,
    ].sort((a, b) => alpha(a, b, factorTitle, 'sort_title'));

    if (toggle) {
      ascendingOrder.album = null;
      ascendingOrder.last = 'title';
      ascendingOrder.title = !ascendingOrder.title;
    }

    return sorted;
  });
};

const reApply = () => {
  if (ascendingOrder.last === 'album') {
    album(false);
  }

  if (ascendingOrder.last === 'artist') {
    artist(false);
  }

  if (ascendingOrder.last === 'title') {
    title(false);
  }
};

export default {
  album,
  artist,
  reApply,
  resetAscendingOrder,
  title,
};
