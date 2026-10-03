const getSalesLocalstorage = () => {
  const obj = JSON.parse(localStorage.getItem('sales'));
  return obj;
};

export default getSalesLocalstorage;
