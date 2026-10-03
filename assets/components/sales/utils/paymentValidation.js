import displayToast from '../../utils/displayToast.js';
import getCode from '../../utils/getCode.js';

const paymentValidation = () => {
  const tx = JSON.parse(localStorage.getItem('sales'));

  if (tx) {
    const { user_id } = JSON.parse(localStorage.getItem('zsdf'));
    const code = getCode();

    return {
      pay_type: tx?.pay_type,
      newpayment: tx?.newpayment,
      createdAt: tx?.receipt_date,
      user_id,
      bank_acc_number: tx?.bank_acc_number,
      code,
    };
  } else {
    return [];
  }
};

export default paymentValidation;
