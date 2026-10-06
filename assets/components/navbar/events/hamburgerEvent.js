import { classSelector } from '../../utils/Selectors.js';
import Menus from '../components/Menus.js';
import innerHTML from '../../utils/v2/innerHTML.js'

const hamburgerEvent = (menu) => {

  document.addEventListener('click', (e) => {
    if (e.target.matches('.hambrg')) {
      classSelector('menu-modal-overlay').classList.add('show');
      document.body.style.overflow = 'hidden';
      innerHTML({
        data: Menus(menu), 
        outputClass: 'menu-container'
      })
    }

    if (e.target.matches('.menu-modal-overlay') || e.target.matches('.close-menu-modal')) {
      classSelector('menu-modal-overlay').classList.remove('show');
      document.body.style.overflow = 'scroll';
    }
  });
};

export default hamburgerEvent;
