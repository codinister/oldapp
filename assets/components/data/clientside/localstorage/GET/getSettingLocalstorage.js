const getSettingLocalstorage = () => {
  if (localStorage.getItem('sinpt') !== 'undefined') {
    return JSON.parse(localStorage.getItem('sinpt'));
  } else {
    return []
  }
};

export default getSettingLocalstorage;
