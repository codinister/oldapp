const getProductsLocalstorage = () => {
  const obj = JSON.parse(localStorage.getItem('prodlocalstorage'));
  return obj;
};

export default getProductsLocalstorage;
