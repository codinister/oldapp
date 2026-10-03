const checkWithholdingtax = () => {
  const sess = JSON.parse(localStorage.getItem('sinpt'));
  const obj = JSON.parse(localStorage.getItem('sales'));

  if (sess?.withholdingtax) {
    if (obj?.withholdingchecked) {
      return `Withholding Tax: <input type="checkbox" checked class="with-tax-inpt" />`;
    } else {
      return `Withholding Tax: <input type="checkbox" class="with-tax-inpt" />`;
    }
  } else {
    return '';
  }
};

export default checkWithholdingtax;
