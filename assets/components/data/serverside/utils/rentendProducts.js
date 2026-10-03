import { daysLeft } from '../../../utils/v2/useDates.js';

const rentendProducts = (data) => {
  return [...data]
    .filter((v) => daysLeft(v.end_date) > 0)
    .filter((v) => v.prod_id > 0)
    .reduce((a, b) => {
      if (a[b.prod_id]) {
        a[b.prod_id] = [...a[b.prod_id], b];
      } else {
        a[b.prod_id] = b;
      }
      return a;
    }, {});
};

export default rentendProducts;
