import displayToast from '../../utils/displayToast.js';

const bankAccValidation = () => {
  const sales = JSON.parse(localStorage.getItem('sales'));
  //Validate Cheque description

  if (sales) {
    if (sales?.pay_type === 'Cheque') {
      if (!sales?.bank_acc_number) {
        return displayToast('bgdanger', 'Cheque number field required!');
      }
    }
    return sales;
  } else {
    return [];
  }
};

export default bankAccValidation;
