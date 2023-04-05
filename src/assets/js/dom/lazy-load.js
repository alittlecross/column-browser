const hideAbove = () => {
  const { scrollTop } = document.getElementById('song-data');

  const rows = Array.from(document.getElementById('songs').rows);
  const rowsAbove = rows.filter((e) => !e.classList.contains('hidden') && !e.hidden && e.offsetHeight + e.offsetTop <= scrollTop);

  if (rowsAbove.length > 99) {
    rowsAbove.slice(0, rowsAbove.length - 99).forEach((e) => {
      e.classList.add('hidden', 'hidden-above');
    });
  }
};

const hideBelow = () => {
  const { offsetHeight, scrollTop } = document.getElementById('song-data');

  const rows = Array.from(document.getElementById('songs').rows);
  const rowsBelow = rows.filter((e) => !e.classList.contains('hidden') && !e.hidden && e.offsetTop >= offsetHeight + scrollTop);

  if (rowsBelow.length > 99) {
    rowsBelow.reverse().slice(-(rowsBelow.length - 99)).forEach((e) => {
      e.classList.add('hidden', 'hidden-below');
    });
  }
};

const showAbove = () => {
  const { scrollTop } = document.getElementById('song-data');

  const rows = Array.from(document.getElementById('songs').rows);
  const rowsAbove = rows.filter((e) => !e.classList.contains('hidden') && !e.hidden && e.offsetHeight + e.offsetTop <= scrollTop);

  if (rowsAbove.length < 99) {
    rows.filter((e) => e.classList.contains('hidden-above')).slice(-(99 - rowsAbove.length)).forEach((e) => {
      e.classList.remove('hidden', 'hidden-above');
    });
  }
};

const showBelow = () => {
  const { offsetHeight, scrollTop } = document.getElementById('song-data');

  const rows = Array.from(document.getElementById('songs').rows);
  const rowsBelow = rows.filter((e) => !e.classList.contains('hidden') && !e.hidden && e.offsetTop >= offsetHeight + scrollTop);

  if (rowsBelow.length < 99) {
    rows.filter((e) => e.classList.contains('hidden-below')).slice(0, 99 - rowsBelow.length).forEach((e) => {
      e.classList.remove('hidden', 'hidden-below');
    });
  }
};

const scrollDown = () => {
  hideAbove();
  showBelow();
};

const scrollUp = () => {
  hideBelow();
  showAbove();
};

let previousScrollTop;

const songs = (e) => {
  if (previousScrollTop < e.target.scrollTop) {
    scrollDown();
  } else {
    scrollUp();
  }

  previousScrollTop = document.getElementById('song-data').scrollTop;
};

export default {
  hideBelow,
  songs,
};
