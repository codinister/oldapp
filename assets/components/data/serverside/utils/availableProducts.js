import { daysLeft } from '../../../utils/v2/useDates.js';
import groupProdQty from './groupProdQty.js';
const availableProducts = (data) => {
  const { prod_quantities, all_sales, all_products } = data;

  const availableProd = all_sales.filter((v) => daysLeft(v.end_date) < 1);

  const groupSales = groupSalesQty(availableProd.filter((v) => v.prod_id > 0));

  const sales = Object.values(groupProdQty(prod_quantities))
    .map((v) => {
      const sales = groupSales[v.prod_id];
      const salesQty = sales ? sales.qty : 0;
      return {
        prod_id: v.prod_id,
        prodQty: v.prod_qty,
        sold: salesQty,
        remaining: Number(v.prod_qty) - Number(salesQty),
      };
    })
    .reduce((a, b) => {
      if (a[b.prod_id]) {
        a[b.prod_id] = [...a[b.prod_id], b];
      } else {
        a[b.prod_id] = b;
      }

      return a;
    }, {});

  return all_products.map((v) => {
    const s = sales[v.prod_id];

    return {
      ...v,
      prodQty: s.prodQty,
      sold: s.sold,
      remaining: s.remaining,
    };
  });
};

export default availableProducts;
