const format_number = (n) => {
  return Number(n)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

export default format_number;
