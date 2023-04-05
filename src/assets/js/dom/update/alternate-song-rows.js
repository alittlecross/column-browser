export default () => {
  Array.from(document.getElementById('songs').rows).map((e) => {
    e.classList.remove('odd');

    return e;
  }).filter((e) => !e.hidden).forEach((e, i) => {
    if (i % 2 !== 0) {
      e.classList.add('odd');
    }
  });
};
