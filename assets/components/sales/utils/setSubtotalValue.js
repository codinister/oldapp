import { classSelector } from '../../utils/Selectors.js';
import format_number from '../../utils/format_number.js';

const setSubtotalValue = () => {
  const obj = JSON.parse(localStorage.getItem('prozdlist'));
  const tx = JSON.parse(localStorage.getItem('sales'));

  if (obj) {
    const trimed = obj
      .map((v) => {
        if (v?.total) {
          return v;
        }
      })
      .filter(Boolean);

    const sub_total = Object.values(trimed).reduce(
      (a, c) => Number(a) + Number(c.total),
      0
    );

    tx['sub_total'] = sub_total;

    classSelector('sub_total').value = format_number(sub_total);

    if (tx.total < 1) {
      classSelector('total').value = format_number(sub_total);
    }

    if (sub_total === 0) {
      localStorage.removeItem('prozdlist');
      classSelector('balance').value = null;
      classSelector('payment').value = null;
      classSelector('total').value = null;
      if (classSelector('top_total')) {
        classSelector('top_total').textContent = '';
      }
      if (classSelector('tax-inpt')) {
        classSelector('tax-inpt').checked = false;
      }

      tx['total'] = 0
      localStorage.setItem('sales', JSON.stringify(tx));
    } else {
      localStorage.setItem('sales', JSON.stringify(tx));
    }
  } else {
    classSelector('sub_total').value = 0;
  }
};
export default setSubtotalValue;
