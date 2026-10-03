import { classSelector } from '../../utils/Selectors.js';

const clearSales = () => {
  localStorage.removeItem('prozdlist');
  localStorage.removeItem('sales');

  if (classSelector('pos-sales-output')) {
    classSelector('pos-sales-output').innerHTML = '';
  }

  document.querySelectorAll('input').forEach((v) => {
    if (!v.classList.contains('row-inpt')) {
      v.value = null;
    }
  });

  if (document.querySelector('.tax-inpt')) {
    document.querySelector('.tax-inpt').checked = false;
  }

  if (classSelector('top_total')) {
    classSelector('top_total').textContent = '';
  }
};

export default clearSales;
