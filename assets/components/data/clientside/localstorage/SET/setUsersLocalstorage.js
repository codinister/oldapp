const setUsersLocalstorage = (obj) => {
  localStorage.setItem('userlocalstorage', JSON.stringify(obj));
};

export default setUsersLocalstorage;
