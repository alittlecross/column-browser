import utils from '../../utils/index.js';

export default () => {
  document.getElementById('all-albums').cells[0].innerHTML = `All (${utils.stringOfRowCount('Album', Array.from(document.getElementById('albums').rows).filter((e) => !e.hidden && !e.id).length)})`;
  document.getElementById('all-artists').cells[0].innerHTML = `All (${utils.stringOfRowCount('Artist', Array.from(document.getElementById('artists').rows).filter((e) => !e.hidden && !e.id).length)})`;
};
