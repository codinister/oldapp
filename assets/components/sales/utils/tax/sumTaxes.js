const sumTaxes = (subtotal, nhil, getfund, vat) => {
  const taxTotal =
    Number(nhil) + Number(getfund) + Number(vat) + Number(subtotal);
  return taxTotal;
};

export default sumTaxes;
