const tracksKeys = ['artists', 'duration_ms', 'id', 'sort_artists', 'sort_title', 'title'];

const albumsKeys = [...tracksKeys, 'album', 'disc_number', 'sort_album', 'track_number'];

const insertRows = (items, keys) => {
  const albumsTrActive = document.querySelector('#albums tr.active, #albums tr.inactive');
  const artistsTrActive = document.querySelector('#artists tr.active, #artists tr.inactive');
  const isAllAlbums = albumsTrActive.isSameNode(document.getElementById('all-albums'));
  const isAllArtists = artistsTrActive.isSameNode(document.getElementById('all-artists'));

  const table = document.getElementById('songs');

  items.forEach((item) => {
    const row = table.insertRow();

    const cell_1 = row.insertCell();
    const cell_2 = row.insertCell();
    const cell_3 = row.insertCell();

    cell_1.innerHTML = item.title;
    cell_2.innerHTML = item.artists.join(', ');
    cell_3.innerHTML = item.album || '';

    keys.forEach((key) => {
      row.dataset[key] = key.endsWith('artists') ? item[key].join(', ') : item[key];
    });

    if (!isAllArtists) {
      if (!item.artists.includes(artistsTrActive.dataset.artist)) {
        row.hidden = true;
      }
    }

    if (!isAllAlbums) {
      if (item.album !== albumsTrActive.dataset.album) {
        row.hidden = true;
      }
    }
  });
};

const albums = (items) => {
  insertRows(items, albumsKeys);
};

const tracks = (items) => {
  insertRows(items, tracksKeys);
};

export default {
  albums,
  tracks,
};
