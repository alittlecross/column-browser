import dom from './dom/index.js';
import spotify from './spotify/index.js';
import utils from './utils/index.js';

document.addEventListener('DOMContentLoaded', async () => {
  /* 1 */ await utils.checkExpiryDate();
  /* 2 */ await spotify.loadSpotifyData();
});

document.getElementById('backward').addEventListener('click', async () => {
  if (await SpotifyPlayer.getCurrentState()) {
    await SpotifyPlayer.previousTrack();
  }
});

document.getElementById('play-pause').addEventListener('click', async () => {
  if (await SpotifyPlayer.getCurrentState()) {
    await SpotifyPlayer.togglePlay();
  } else {
    const trActive = document.querySelector('#songs tr.active');
    const trInactive = document.querySelector('#songs tr.inactive');
    const trFirst = Array.from(document.getElementById('songs').rows).filter((e) => !e.hidden)[0];

    /* 1 */ await utils.checkExpiryDate();
    /* 2 */ await spotify.playSongs(trActive || trInactive || trFirst);
  }
});

document.getElementById('forward').addEventListener('click', async () => {
  if (await SpotifyPlayer.getCurrentState()) {
    await SpotifyPlayer.nextTrack();
  }
});

document.getElementById('artists').addEventListener('click', async (e) => {
  /* 1 */ dom.update.activeRow(e, 'artists'); dom.update.inactiveAlbumRow(); dom.update.inactiveSongRow();
  /* 2 */ dom.applyFilter.songData();
  /* 3 */ dom.applyFilter.albumData();
  /* 4 */ dom.update.alternateSongRows(); dom.update.filterRowCounts(); dom.update.statusBar();
});

document.getElementById('albums').addEventListener('click', async (e) => {
  /* 1 */ dom.update.activeRow(e, 'albums'); dom.update.inactiveRow('artists'); dom.update.inactiveSongRow();
  /* 2 */ dom.applyFilter.songData();
  /* 3 */ dom.update.alternateSongRows(); dom.update.filterRowCounts(); dom.update.statusBar();
});

document.getElementById('title').addEventListener('click', async () => {
  /* 1 */ dom.sortSongData.title();
  /* 2 */ dom.update.alternateSongRows();
});

document.getElementById('artist').addEventListener('click', async () => {
  /* 1 */ dom.sortSongData.artist();
  /* 2 */ dom.update.alternateSongRows();
});

document.getElementById('album').addEventListener('click', async () => {
  /* 1 */ dom.sortSongData.album();
  /* 2 */ dom.update.alternateSongRows();
});

document.getElementById('songs').addEventListener('click', async (e) => {
  dom.update.activeRow(e, 'songs');
  dom.update.inactiveRow('albums');
  dom.update.inactiveRow('artists');
});

document.getElementById('songs').addEventListener('dblclick', async (e) => {
  /* 1 */ await utils.checkExpiryDate();
  /* 2 */ await spotify.playSongs(e.target.parentElement);
});

document.getElementById('songs').addEventListener('touchstart', async (e) => {
  const thisTouch = new Date().getTime();

  e.target.preventDefault();

  if (thisTouch - previousTouch < 500) {
    /* 1 */ await utils.checkExpiryDate();
    /* 2 */ await spotify.playSongs(e.target.parentElement);
  }

  previousTouch = thisTouch;
});

window.onSpotifyWebPlaybackSDKReady = async () => {
  spotify.createSpotifyPlayer();
};
