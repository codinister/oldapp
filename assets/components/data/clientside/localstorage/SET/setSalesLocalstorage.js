const setSalesLocalstorage = (obj) => {
  localStorage.setItem('sales', JSON.stringify(obj));
};

export default setSalesLocalstorage;
