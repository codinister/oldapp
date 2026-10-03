const getCurrency = () => {
  const cur = JSON.parse(localStorage.getItem('sinpt'));

  if (cur?.currency) {
    return cur?.currency;
  } else {
    return 'GHs';
  }
};

export default getCurrency;
