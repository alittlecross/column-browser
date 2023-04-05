export default () => {
  const trActive = document.querySelector('#songs tr.active');
  const trInactive = document.querySelector('#songs tr.inactive');

  if (trActive) {
    trActive.classList.remove('active');

    if (!trActive.hidden) {
      trActive.classList.add('inactive');
    }
  }

  if (trInactive && trInactive.hidden) {
    trInactive.classList.remove('inactive');
  }
};
