const groupProdQty = (prod) => {
  return [...prod].reduce((a, b) => {
    if (a[b.prod_id]) {
      a[b.prod_id] = {
        ...b,
        prod_qty: Number(a[b.prod_id].prod_qty) + Number(b.prod_qty),
      };
    } else {
      a[b.prod_id] = b;
    }
    return a;
  }, {});
};

export default groupProdQty;
