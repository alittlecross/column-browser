export default (tally, total) => {
  document.querySelector('#right-section').innerHTML = `${Math.floor((tally / total) * 100)}%`;
};
