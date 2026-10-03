const calculateGETFUND = (subtotal, v) => {
  const getfund = (Number(subtotal) * Number(v.getfund)) / 100;
  return getfund;
};

export default calculateGETFUND;

