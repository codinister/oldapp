const taxChecker = () => {
  const {
    sub_total,
    discount,
    vat_rate,
    nhil_rate,
    covid_rate,
    getfund_rate,
    withholdingtax_rate,
  } = JSON.parse(localStorage.getItem('sales'));

  const subtotal = Number(sub_total) - Number(discount);

  const covid = (Number(subtotal) * Number(covid_rate)) / 100;

  const getfund = (Number(subtotal) * Number(getfund_rate)) / 100;

  const nhil = (Number(subtotal) * Number(nhil_rate)) / 100;

  const v1 = Number(subtotal) + Number(nhil);
  const v2 = Number(v1) + Number(getfund);
  const v3 = Number(v2) + Number(covid);
  const v4 = Number(v3) * Number(vat_rate);
  const vat = Number(v4) / 100;

  const witholding = (Number(subtotal) * Number(withholdingtax_rate)) / 100;

  console.log({
    subtotal,
    discount,
    covid,
    getfund,
    nhil,
    vat,
    witholding,
  });
};

export default taxChecker;
