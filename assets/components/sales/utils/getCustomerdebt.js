import format_number from '../../utils/format_number.js';

const getCustomerdebt = (cust_id, receipt, allinvoices) => {
  if (receipt) {
    //BEGIN GET PAYMENTS
    const receipts = Object.values(receipt)
      .filter((v) => v.cust_id === cust_id)
      .reduce((a, c) => {
        if (a[c.cust_id]) {
          a[c.cust_id].payment += Number(c.payment);
        } else {
          a[c.cust_id] = c;
        }
        return a;
      }, {});

    const paymentList = Object.values(receipts);
    const totalPayments = Object.values(paymentList).reduce((a, b) => {
      return Number(a) + Number(b.amount);
    }, 0);

    //END GET PAYMENTS

    //BEGIN GET TOTAL PURCHASES

    const invoices = Object.values(allinvoices)
      .filter((v) => v.cust_id === cust_id)
      .reduce((a, c) => {
        if (a[c.cust_id]) {
          a[c.cust_id].total += c.total;
        } else {
          a[c.cust_id] = c;
        }
        return a;
      }, {});

    const invoiceList = Object.values(invoices);

    const totalpurchase = Object.values(invoiceList).reduce((a, b) => {
      return Number(a) + Number(b.total);
    }, 0);

    //END GET TOTAL PURCHASES

    console.log(totalpurchase);

    console.log(totalPayments);

    const total = Number(totalpurchase) - Number(totalPayments);

    const totaldebt = isNaN(total) ? 0.0 : total;

    return format_number(totaldebt);
  }
};

export default getCustomerdebt;
