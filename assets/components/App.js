import restrictAccess from './app/utils/restrictAccess.js';
import searchParam from './app/utils/searchParam.js';
import { classSelector } from './utils/Selectors.js';
restrictAccess();

searchParam();

document.addEventListener('click', (e) => {
  if (e.target.matches('.modal-overlay')) {
    e.target.classList.remove('show');
    document.body.style.overflow = 'scroll';
  }

  if (e.target.matches('.close-modal')) {
    classSelector('modal-overlay').classList.remove('show');
    document.body.style.overflow = 'scroll';
  }
});
