const alpha = (a, b, field) => (a.dataset[field].localeCompare(b.dataset[field]));

const tracks = (items) => {
  const table = document.getElementById('artists');

  items
    .map((e) => e.artists
      .map((_, i) => ({
        artist: e.artists[i],
        sort_artist: e.sort_artists[i],
      })))
    .flat()
    .filter((e, i, a) => a.findIndex((ee) => (e.artist === ee.artist)) === i)
    .forEach((e) => {
      if (!table.querySelector(`[data-sort_artist="${e.sort_artist}"]`)) {
        const row = table.insertRow();

        row.dataset.artist = e.artist;
        row.dataset.sort_artist = e.sort_artist;

        const cell = row.insertCell();

        cell.innerHTML = e.artist;
      }
    });

  Array.from(table.rows).slice(1).sort((a, b) => alpha(a, b, 'sort_artist')).forEach((e) => {
    table.appendChild(e);
  });
};

const albums = (items) => {
  tracks(items);

  const artistsTrActive = document.querySelector('#artists tr.active, #artists tr.inactive');
  const isAllArtists = artistsTrActive.isSameNode(document.getElementById('all-artists'));
  const table = document.getElementById('albums');

  items
    .filter((e, i, a) => a.findIndex((ee) => (e.album === ee.album)) === i)
    .forEach((e) => {
      if (!table.querySelector(`[data-sort_album="${e.sort_album}"]`)) {
        const row = table.insertRow();

        row.dataset.album = e.album;
        row.dataset.sort_album = e.sort_album;

        if (!isAllArtists) {
          if (!e.artists.includes(artistsTrActive.dataset.artist)) {
            row.hidden = true;
          }
        }

        const cell = row.insertCell();

        cell.innerHTML = e.album;
      }
    });

  Array.from(table.rows).slice(1).sort((a, b) => alpha(a, b, 'sort_album')).forEach((e) => {
    table.appendChild(e);
  });
};

export default {
  albums,
  tracks,
};
