const updateTaxlocalstorage = (name, val) => {
  if (localStorage.getItem('sales')) {
    const tx = JSON.parse(localStorage.getItem('sales'));
    tx[name] = val;
    localStorage.setItem('sales', JSON.stringify(tx));
  }
};

export default updateTaxlocalstorage;
