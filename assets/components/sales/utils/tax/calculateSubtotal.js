const calculateSubtotal = (v) => {
  const subtotal = Number(v.sub_total) - Number(v.discount);
  return subtotal;
};

export default calculateSubtotal;
