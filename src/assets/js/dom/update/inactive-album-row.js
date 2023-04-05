export default () => {
  const trActive = document.querySelector('#albums tr.active');
  const trInactive = document.querySelector('#albums tr.inactive');

  if (trActive) {
    trActive.classList.remove('active');
  }

  if (trInactive) {
    trInactive.classList.remove('inactive');
  }

  document.querySelector('#albums tr').classList.add('inactive');
};
