const preventSalesmutation = (sales) => {
  const obj = sales.map((v) => ({
    amount: v.amount,
    cat_id: v.cat_id,
    createdAt: v.createdAt,
    cust_id: v.cust_id,
    email: v.email,
    exp_date: v.exp_date,
    fullname: v.fullname,
    invoice_no: v.invoice_no,
    phone: v.phone,
    prod_id: v.prod_id,
    prod_image: v.prod_image,
    prod_name: v.prod_name,
    prod_qty: v.prod_qty,
    prod_size: v.prod_size,
    profile: v.profile,
    qty: v.qty,
    s_id: v.s_id,
    selling_price: v.selling_price,
    tax_id: v.tax_id,
    total: v.total,
    trans_type: v.trans_type,
    user_id: v.user_id,
  }));

  return obj;
};

export default preventSalesmutation;
