const getLoginuser = () => {
  if (localStorage.getItem('zsdf') !== 'undefined') {
    return JSON.parse(localStorage.getItem('zsdf'));
  } else {
    return []
  }
};

export default getLoginuser;
