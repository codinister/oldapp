import Layout from '../Layout.js';

const setPage = (selector, page) => {
  if (document.querySelector('.root')) {
    document.querySelector('.root').innerHTML = Layout(selector, page);
  }
};

export default setPage;
