const tableHeader = (arr) => {
  if (!Array.isArray(arr)) return console.log('Array is required!');
  return arr.map((v) => `<div>${v}</div>`).join(' ');
};

export default tableHeader;
