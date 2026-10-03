const debounce = (fn, delay) => {
  let id;
  console.log(`Previous id ${id}`);
  return (...res) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      fn(...res);
    }, delay);
    console.log(`new id ${id}`);
  };
};

export default debounce;
