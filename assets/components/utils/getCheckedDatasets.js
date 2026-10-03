import { classSelector } from './Selectors.js';

const getCheckedDatasets = () => {
  let arr = [];
  document.querySelectorAll('.prodcheckbx').forEach((v) => {
    if (v.checked) {
      arr.push({
        prod_id: v.getAttribute('data-prod_id'),
        prod_name: v.getAttribute('data-prod_name'),
        prod_image: v.getAttribute('data-prod_image'),
        price: v.getAttribute('data-price'),
        length: v.getAttribute('data-length'),
        qty: v.getAttribute('data-qty'),
        type: v.getAttribute('data-type'),
      });
    }
  });

  if (arr.length > 0) {
    classSelector('selectedProd').classList.add('show');
  } else {
    classSelector('selectedProd').classList.remove('show');
  }

  localStorage.setItem('allstocks', JSON.stringify(arr));
};

export default getCheckedDatasets;
