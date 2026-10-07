import searchParam from './searchParam.js';

const restrictAccess = () => {
  if (!localStorage.getItem('zsdf')) {
    history.pushState(null, '', 'index.html');
    searchParam();
  }
};

export default restrictAccess;
