const setLoginUser = (obj) => {
  localStorage.setItem('userprofile', JSON.stringify(obj));
};

export default setLoginUser;

