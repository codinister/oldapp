import availableStocksFunc from '../products/availableStocksFunc.js';
import allStocksFunc from '../products/allStocksFunc.js';
import soldStocksFunc from '../products/soldStocksFunc.js';
import { classSelector } from './Selectors.js';

const productSearchEventFunc = (
  e,
  products,
  sales,
  available,
  outputClass,
  editClass,
  deleteClass
) => {
  const stockType = localStorage.getItem('stocks');

  const inpt = e.target.value;
  let output = [];

  if (stockType == 1) {
    output = products;
  } else if (stockType == 2) {
    output = sales;
  } else if (stockType == 3) {
    output = available;
  }

  if (output) {
    const searchres = Object.values(output)
      .filter((v) =>
        Object.values(v).join('').toLowerCase().includes(inpt.toLowerCase())
      )
      .map((v) => {
        if (stockType == 1) {
          return allStocksFunc(v, editClass, deleteClass);
        } else if (stockType == 2) {
          return soldStocksFunc(v, editClass, deleteClass);
        } else if (stockType == 3) {
          return availableStocksFunc(v, editClass, deleteClass);
        }
      })
      .join('');

    classSelector(outputClass).innerHTML = searchres;
  } else {
    classSelector(outputClass).innerHTML = '';
  }
};

export default productSearchEventFunc;
