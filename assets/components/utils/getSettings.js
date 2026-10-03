const getSettings = (callback) => {
  const settings = JSON.parse(localStorage.getItem('sinpt'));
  callback(settings);
};

export default getSettings;
