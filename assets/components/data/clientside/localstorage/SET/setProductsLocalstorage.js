const setProductsLocalstorage = (obj) => {
  localStorage.setItem('prodlocalstorage', JSON.stringify(obj));
};

export default setProductsLocalstorage;
