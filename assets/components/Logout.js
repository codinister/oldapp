import searchParam from './app/utils/searchParam.js';
import removeItems from './logout/utils/removeItems.js';

const Logout = () => {
  removeItems();

  history.pushState(null, '', 'index.html');

  searchParam();
  return;
};

export default Logout;
