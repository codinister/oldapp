const termnalReceipt = () => {
  const { receipt_type } = JSON.parse(localStorage.getItem('sinpt'));
  if (receipt_type === 'THERMNAL') {
    return true;
  } else {
    return false;
  }
};

export default termnalReceipt;
