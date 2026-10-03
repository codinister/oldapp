import pageHistory from './utils/pageHistory.js';
import { classSelector } from './utils/Selectors.js';

pageHistory();

document.addEventListener('click', (e) => {
  if (e.target.matches('.modal-overlay')) {
    e.target.classList.remove('show');
    document.body.style.overflow = 'scroll';
  }

  if (e.target.matches('.close-modal')) {
    classSelector('modal-overlay').classList.remove('show');
    document.body.style.overflow = 'scroll';
  }

  if (e.target.matches('.navlinks')) {
    const { navlinks } = e.target.dataset;

    history.pushState(null, '', navlinks);
    pageHistory();
  }

  if (e.target.matches('.fminpt')) {
    e.target.removeAttribute('readonly');
  }
});

window.onpopstate = function (e) {
  pageHistory();
};


