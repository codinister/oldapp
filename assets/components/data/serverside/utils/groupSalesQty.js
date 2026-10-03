const groupSalesQty = (sales) => {
  return [...sales].reduce((a, b) => {
    if (a[b.prod_id]) {
      a[b.prod_id] = {...b, qty: Number(a[b.prod_id].qty) + Number(b.qty)}
    } else {
      a[b.prod_id] = b;
    }
    return a;
  }, {});
};

export default groupSalesQty;
