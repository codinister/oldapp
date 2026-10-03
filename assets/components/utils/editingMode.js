const editingMode = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.close-editimng-mode')) {
      document.querySelector('.editingmode').classList.add('remove');
      document.querySelector('.editingmode').classList.remove('remove');
      document.querySelector('.editingmode').classList.remove('show');
    }
  });
  return `<div class="editingmode">
  <div class="editing-mode-inner"></div>
  <a href="javascript:void(0);" class="close-editimng-mode" title="Close">x</a></div>`;
};

export default editingMode;
