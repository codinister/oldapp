const preventReceiptmutation = (receipt) => {
  const receipts = receipt.map((v) => ({
    amount: v.amount,
    createdAt: v.createdAt,
    cust_id: v.cust_id,
    exp_date: v.exp_date,
    fullname: v.fullname,
    invoice_no: v.invoice_no,
    pay_id: v.pay_id,
    payment: v.payment,
    phone: v.phone,
    prod_id: v.prod_id,
    prod_name: v.prod_name,
    profile: v.profile,
    qty: v.qty,
    s_id: v.s_id,
    tax_id: v.tax_id,
    total: v.total,
    user_id: v.user_id,
  }));

  return receipts;
};

export default preventReceiptmutation;
