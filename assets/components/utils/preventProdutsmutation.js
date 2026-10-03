const preventProdutsmutation = (products) => {
  const prod = products.map((v) => ({
    cat_id: v.cust_id,
    cat_name: v.cat_name,
    createdAt: v.createdAt,
    prod_code: v.prod_code,
    prod_id: v.prod_id,
    prod_image: v.prod_image,
    prod_name: v.prod_name,
    prod_qty: v.prod_qty,
    prod_qty_date: v.prod_qty_date,
    prod_size: v.prod_size,
    qty_id: v.qty_id,
    selling_price: v.selling_price,
    type: v.type,
  }));

  return prod;
};

export default preventProdutsmutation;
