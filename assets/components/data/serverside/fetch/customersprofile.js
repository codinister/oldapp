import accessControl from '../../../sales/utils/accessControl.js';
import { expdate_left, ymd } from '../../../utils/DateFormats.js';
import inv_num from '../../../utils/inv_num.js';

const customersprofile = (callback) => {
  const baseURL = 'router.php?controller=customersprofile&task';
  Promise.allSettled([
    fetch(`${baseURL}=getCustomers`).then((resp) => resp.json()),
    fetch(`${baseURL}=getInvoices`).then((resp) => resp.json()),
    fetch(`${baseURL}=getProformas`).then((resp) => resp.json()),
    fetch(`${baseURL}=getReceipts`).then((resp) => resp.json()),
  ])
    .then((value) => {
      /*
       * ALL CUSTOMERS
       */
      const allcustomers = Object.values(value[0].value).reduce((a, b) => {
        a[b.cust_id] = b;
        return a;
      }, {});

      /*
       * ALL RECEIPTS
       */

      const allreceipts = Object.values(value[3].value)
        .map((v) => ({
          ...v,
          payment: Number(v.payment),
          receipts: [{ ...v, receipt_no: inv_num(v.pay_id) }],
          receipt_count: 1,
          total_payments: Number(v.payment) || 0,
        }))
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            a[b.cust_id].receipt_count += Number(b.receipt_count);
            delete b.total_payments;
            a[b.cust_id].total_payments += Number(b.payment);
            delete b.receipts;
            a[b.cust_id].receipts.push({ ...b, receipt_no: inv_num(b.pay_id) });
            delete b.receipts;
            delete b.receipt_count;
          } else {
            a[b.cust_id] = b;
          }
          return a;
        }, {});

      const invoiceReceipts = Object.values(value[3].value)
        .map((v) => ({
          tax_id: v.tax_id,
          payment: Number(v.payment),
          total_payments: Number(v.payment) || 0,
        }))
        .reduce((a, b) => {
          if (a[b.tax_id]) {
            delete b.total_payments;
            a[b.tax_id].total_payments += Number(b.payment);
          } else {
            a[b.tax_id] = b;
          }
          return a;
        }, {});

      /*
       * ALL INVOICES
       */
      const allinvoices = Object.values(value[1].value)
        .map((v) => {

          const invdates = v.end_date === null ? v.exp_date : v.end_date;

          const daysleft = 14 / expdate_left(invdates);
          const custo = allcustomers[v.cust_id];
          const rec = invoiceReceipts[v.tax_id];

          return {
            ...v,

            fullname: custo ? custo?.fullname : '',
            phone: custo ? custo?.phone : '',

            invoice_total: Number(v.total),
            invoice_count: 1,
            invoice_list: {
              [v.tax_id]: {
                ...v,
              },
            },

            balance:
              Math.floor(Number(v.total) - Number(rec?.total_payments)) || 0,
            paymentPercentage:
              Math.floor(
                (100 * Number(rec?.total_payments)) / Number(v.total)
              ) || 0,

            payments: rec ? Number(rec?.total_payments) : 0,
            profile: v.profile,

            expiries:
              daysleft > 1
                ? {
                    [v.exp_date]: {
                      cust_id: v.cust_id,
                      fullname: custo ? custo?.fullname : '',
                      phone: custo ? custo?.phone : '',
                      tax_id: v.tax_id,
                      exp_date: invdates,
                      profile: v.profile,
                    },
                  }
                : {},
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            const dateleft = 14 / expdate_left(b.exp_date);

            a[b.cust_id].invoice_count += 1;
            a[b.cust_id].invoice_total += Number(b.invoice_total);

            delete b.invoice_list;
            delete b.payments;
            a[b.cust_id].invoice_list[b.tax_id] = { ...b };

            if (dateleft > 1) {
              a[b.cust_id].expiries[b.exp_date] = {
                cust_id: b.cust_id,
                fullname: b.fullname,
                phone: b.phone,
                tax_id: b.tax_id,
                exp_date: b.exp_date,
                profile: b.profile,
              };
            } else {
            }
          } else {
            a[b.cust_id] = b;
          }

          return a;
        }, {});

      /*
       * ALL PROFORMAS
       */


      const allproformas = Object.values(value[2].value)
        .map((v) => {
          return {
            ...v,
            proforma_count: 1,
            proforma_total: Number(v.total),
            proforma_list: [
              {
                ...v,
              },
            ],
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            (a[b.cust_id].proforma_count += 1),
              (a[b.cust_id].proforma_total += Number(b.proforma_total));

            delete b.proforma_count;
            delete b.proforma_total;
            delete b.proforma_list;
            a[b.cust_id].proforma_list.push({ ...b });
          } else {
            a[b.cust_id] = b;
          }

          return a;
        }, {});



      //CUSTOMER PROFILE
      const custprofile = Object.values(allcustomers).map((v) => {
        const rec = allreceipts[v.cust_id];

        const inv = allinvoices[v.cust_id];
        const prof = allproformas[v.cust_id];

        const invoice_list_data = inv ? Object.values(inv?.invoice_list) : [];
        const total_sales = [...invoice_list_data].reduce((a, b) => {
          return Number(a) + Number(b.total);
        }, 0);

        const total_transactions = total_sales;
        const total_payment = rec ? rec?.total_payments : 0;
        const total_debt = Number(total_transactions) - Number(total_payment);

        return {
          ...v,

          //begin receipt
          receipt_count: rec ? rec?.receipt_count : 0,
          payments_received: total_payment,
          receipt_list: rec
            ? [...rec?.receipts].map((vl) => {
                return { ...vl, fullname: v.fullname, phone: v.phone };
              })
            : [],

          //begin invoice
          invoice_count: inv ? inv?.invoice_count : 0,
          invoice_total: inv ? inv?.invoice_total : 0,
          invoice_list: invoice_list_data,
          expiries: inv ? inv?.expiries : {},
          aginginvoice:
            total_debt > 0
              ? {
                  fullname: v.fullname,
                  phone: v.phone,
                  email: v.email,
                  location: v.location,
                  user_id: v.user_id,
                  cust_id: v.cust_id,
                  total: inv ? inv?.invoice_total : 0,
                  payment: total_payment,
                  debt: total_debt,
                }
              : '',

          total_sales,
          total_debt,

          //begin proforma
          proforma_count: prof ? prof?.proforma_count : 0,
          proforma_total: prof ? prof?.proforma_total : 0,
          proforma_list: prof ? prof?.proforma_list : [],
        };
      });

  
      const data = custprofile.length > 0 ?  accessControl(custprofile) : []


      callback(data);
    })
    .catch((err) => console.error(err));
};

export default customersprofile;
