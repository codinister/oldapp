const calculateVAT = (subtotal, v) => {
  console.log(subtotal, v.vat)
  const total = Number(subtotal) * Number(v.vat);
  const vat = Number(total) / 100;
  console.log(vat)
  return vat;
};

export default calculateVAT;
