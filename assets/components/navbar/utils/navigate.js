import searchParam from '../../app/utils/searchParam.js';

const navigate = (link) => {
  const navlink = `?page=${link}`;
  history.pushState(null, '', navlink);
  searchParam();
};

export default navigate;
