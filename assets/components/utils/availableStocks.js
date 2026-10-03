import soldProducts from './soldProducts.js';
import preventProdutsmutation from './preventProdutsmutation.js';
import preventSalesmutation from './preventSalesmutation.js';

const availableStocks = (sales, quantities, products) => {
  if (sales && products && quantities) {
    const quantity = quantities.map((v) => ({
      qty_id: v.qty_id,
      prod_qty: v.prod_qty,
      prod_id: v.prod_id,
      createdAt: v.createdAt,
    }));

    const sale = preventSalesmutation(sales);

    const salesobj = soldProducts(sale);

    const product = preventProdutsmutation(products);

    const groupsales = salesobj.reduce((a, b) => {
      if (a[b.prod_id]) {
        a[b.prod_id].qty += b.qty;
        a[b.prod_id].amount += b.amount;
      } else {
        a[b.prod_id] = b;
      }
      return a;
    }, {});

    const groupqty = Object.values(
      Object.values(quantity).reduce((a, b) => {
        if (a[b.prod_id]) {
          a[b.prod_id].prod_qty += b.prod_qty;
        } else {
          a[b.prod_id] = b;
        }
        return a;
      }, {})
    );

    groupqty.forEach((v) => {
      if (groupsales[v.prod_id]) {
        groupsales[v.prod_id].prod_qty = v.prod_qty;
      }
    });

    const soldproducts = Object.values(groupsales)
      .map((v) => {
        const remaining_prod_qty = Number(v.prod_qty) - Number(v.qty);
        return {
          prod_qty: remaining_prod_qty > 0 ? remaining_prod_qty : 0,
          prod_id: v.prod_id,
          cat_id: v.cat_id,
          prod_name: v.prod_name,
          prod_size: v.prod_size,
          prod_image: v.prod_image,
          exp_date: v.exp_date,
          prod_code: v.prod_code,
          selling_price: v.selling_price,
          createdAt: v.createdAt,
          prodqty: v.prod_qty,
        };
      })
      .reduce((a, b) => {
        a[b.prod_id] = b;
        return a;
      }, {});

    const allproducts = Object.values(product)
      .map((v) => ({
        prod_qty: v.prod_qty,
        prod_id: v.prod_id,
        cat_id: v.cat_id,
        prod_name: v.prod_name,
        prod_size: v.prod_size,
        prod_image: v.prod_image,
        prod_code: v.prod_code,
        selling_price: v.selling_price,
        createdAt: v.createdAt,
        prodqty: v.prod_qty,
      }))
      .reduce((a, b) => {
        a[b.prod_id] = b;
        return a;
      }, {});

    const compose = Object.values({ ...allproducts, ...soldproducts }).filter(
      (v) => {
        if (v.prodqty < 1) {
          return v;
        } else {
          return v.prod_qty > 0;
        }
      }
    );

    return Object.values(compose);
  } else {
    return [];
  }
};

export default availableStocks;
