import defaultProductsLocalstorage from '../localstorage/default/defaultProductsLocalstorage.js';
import getProductsLocalstorage from '../localstorage/GET/getProductsLocalstorage.js';
import setProductsLocalstorage from '../localstorage/SET/setProductsLocalstorage.js';
import { ymd } from '../../../utils/DateFormats.js';

const productReducer = (e) => {
  if (e.target.matches('.prod-inpt')) {
    defaultProductsLocalstorage();

    const { name, value, id } = e.target;

    const obj = getProductsLocalstorage();

    if (e.target.matches('.prod_qty')) {
      const newobj = {
        ...obj,
        prod_qty_arr: {
          ...obj?.prod_qty_arr,
          [name]: {
            prod_qty: value,
            qty_id: obj?.prod_qty_arr[name]?.qty_id || '',
            createdAt: obj?.prod_qty_arr[name]?.createdAt || ymd(new Date()),
          },
        },
      };

      setProductsLocalstorage(newobj);
    } else {
      const newobj = { ...obj, [name]: value };
      setProductsLocalstorage(newobj);
    }
  }
};

export default productReducer;
