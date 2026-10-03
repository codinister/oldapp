const calculateNHIL = (subtotal, v) => {
  const nhil = (Number(subtotal) * Number(v.nhil)) / 100;
  return nhil;
};

export default calculateNHIL;
