const getSortString = (string) => string
  .toLowerCase()
  .replace(/[^a-z0-9 ]/g, '')
  .replace(/^(a|an|the) /g, '')
  .replace(/\s{2,}/, ' ')
  .trim();

const albums = (items) => items.flatMap(({ album: { artists, name: album, tracks } }) => tracks.items.map(({
  disc_number, duration_ms, id, name: title, track_number,
}) => ({
  album,
  artists: artists.map((e) => e.name),
  disc_number,
  duration_ms,
  id,
  sort_album: getSortString(album),
  sort_artists: artists.map((e) => getSortString(e.name)),
  sort_title: getSortString(title),
  title,
  track_number,
})));

const tracks = (items) => items.map(({
  track: {
    artists, duration_ms, id, name: title,
  },
}) => ({
  artists: artists.map((e) => e.name),
  duration_ms,
  id,
  sort_artists: artists.map((e) => getSortString(e.name)),
  sort_title: getSortString(title),
  title,
}));

export default {
  albums,
  tracks,
};
