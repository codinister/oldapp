import format_number from '../../../utils/format_number.js';

const setBalance = (val) => {
  if (val) {
    const sumpayment = Number(val?.previouspayment) + Number(val?.newpayment);
    const balance = Number(val?.total) - Number(sumpayment);
    val['balance'] = balance;
    localStorage.setItem('sales', JSON.stringify(val));
    const vl = JSON.parse(localStorage.getItem('sales'));
    return format_number(vl.balance);
  }
};

export default setBalance;
