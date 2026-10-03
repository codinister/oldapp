import inv_num from './utils/inv_num';

const Stocks = (products, sale) => {
  return products.map((v, i) => {
    const prod_id = v.prod_id;
    const cat_id = v.cat_id;
    const cat_name = v.cat_name;
    const prod_name = v.prod_name;
    const prod_qty = v.prod_qty;
    const selling_price = v.selling_price;
    const packages = v.package;
    const date = v.date;
    const updated_on = v.updated_on;

    const sales = Object.values(sale).filter(
      (val) => val.prod_id === v.prod_id && val.date >= v.date
    );

    const sold = Array.from(sales)
      .map((vv) => vv)
      .map((vs) => vs.qty)
      .reduce((a, b) => {
        return Number(a) + Number(b);
      }, []);

    const expiries = Array.from(sales)
      .map((vss) => {
        const curdate = new Date().getTime();
        const exp_date = new Date(vss.exp_date).getTime();
        const sub = exp_date - curdate;
        const day = Math.floor(sub / (1000 * 60 * 60 * 24));
        if (day > 0 && day < 7) {
          return {
            invoice_no: inv_num(vss.tax_id),
            fullname: vss.fullname,
            phone: vss.phone,
            email: vss.email,
            days: day,
            expdate: vss.exp_date,
            project: vss.project,
          };
        }
      })
      .filter(Boolean);
    const remaining = prod_qty - sold;
    const prodid = `ps${prod_id}${cat_id}`;
    return {
      prod_id,
      cat_id,
      cat_name,
      prod_name,
      prod_qty,
      selling_price,
      date,
      sold,
      remaining,
      prodid,
      expiries,
      packages,
    };
  });
};

export default Stocks;
