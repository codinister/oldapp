
const calculateReceiptBalance = (obj) => {
  const groupByTaxid = [...obj].reduce((a, b) => {
    if (a[b.tax_id]) {
      a[b.tax_id].push(b);
    } else {
      a[b.tax_id] = [b];
    }

    return a;
  }, {});

  return (tax_id, pay_id) => {
    return groupByTaxid[tax_id]
      .filter((v) => pay_id >= v.pay_id)
      .reduce((a, b) => Number(b.payment) + Number(a), 0);
  };
}

export default calculateReceiptBalance