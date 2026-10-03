const getUsersLocalstorage = () => {
  if (localStorage.getItem('userlocalstorage')) {
    return JSON.parse(localStorage.getItem('userlocalstorage'));
  } else {
    return []
  }
};

export default getUsersLocalstorage;
