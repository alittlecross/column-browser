export default (e, id) => {
  const tr = e.target.parentElement;

  const trActive = document.querySelector(`#${id} tr.active`);
  const trInactive = document.querySelector(`#${id} tr.inactive`);

  if (!tr.isSameNode(trActive)) {
    if (trActive) {
      trActive.classList.remove('active');
    }

    if (trInactive) {
      trInactive.classList.remove('inactive');
    }

    tr.classList.add('active');
  }
};
