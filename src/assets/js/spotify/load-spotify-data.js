import dom from '../dom/index.js';
import getSpotifyData from './_get-spotify-data.js';
import utils from '../utils/index.js';

const all = true;

export default async () => {
  let dividend = 0;
  let divisor = 0;
  let items;
  let nextAlbums = 'https://api.spotify.com/v1/me/albums?offset=0&limit=50';
  let nextTracks = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50';
  let total = 0;

  const processSpotifyData = (type) => {
    /* 1 */ dividend += items.length;
    /* 2 */ items = utils.formatSpotifyData[type](items);
    /* 3 */ dom.update.songData[type](items);
    /* 4 */ dom.update.filterData[type](items);
    /* 5 */ dom.sortSongData.resetAscendingOrder(); dom.update.alternateSongRows(); dom.update.filterRowCounts(); dom.update.percentLoaded(dividend, divisor); dom.update.statusBar();
  };

  ({ items, next: nextTracks, total } = await getSpotifyData(nextTracks));
  divisor += total;
  processSpotifyData('tracks');

  ({ items, next: nextAlbums, total } = await getSpotifyData(nextAlbums));
  divisor += total;
  processSpotifyData('albums');

  if (all) {
    while (nextTracks || nextAlbums) {
      if (nextTracks) {
        ({ items, next: nextTracks } = await getSpotifyData(nextTracks));
        processSpotifyData('tracks');
      }

      if (nextAlbums) {
        ({ items, next: nextAlbums } = await getSpotifyData(nextAlbums));
        processSpotifyData('albums');
      }
    }
  }
};
