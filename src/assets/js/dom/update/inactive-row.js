export default (id) => {
  const trActive = document.querySelector(`#${id} tr.active`);

  if (trActive) {
    trActive.classList.remove('active');
    trActive.classList.add('inactive');
  }
};
