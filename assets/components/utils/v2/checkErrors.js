const checkErrors = () => {
  const errors = Array.from(document.querySelectorAll('.errors'));

  let arr = [];
  errors.forEach((v) => {
    arr.push(v.innerText);
  });

  return arr.filter(Boolean).length > 0 ? true : false;
};

export default checkErrors;
