const itemsValidation = () => {
  const { invoice_date, code } = JSON.parse(localStorage.getItem('sales'));
  const prods = JSON.parse(localStorage.getItem('prozdlist'));

  if (prods) {
    const products = prods
      .map((v) => v)
      .filter(Boolean)
      .map((v) => {
        if (v.prod_name) {
          return {
            s_id: v.s_id,
            qty: Number(v.qty),
            prod_id: v.prod_id,
            prod_name: v.prod_name,
            duration: Number(v.duration),
            unit_price: Number(v.prod_price),
            total: Number(v.total),
            code,
          };
        }
      })
      .filter(Boolean);

    return products;
  } else {
    return [];
  }
};

export default itemsValidation;
