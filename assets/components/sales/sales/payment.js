
import updateTaxlocalstorage from '../utils/updateTaxlocalstorage.js';
import paymentUtil from './paymentUtil.js';

const payment = (privilege) => {
  document.addEventListener('change', (e) => {
    if (e.target.matches('.receipt_date')) {
      const { value } = e.target;
      updateTaxlocalstorage('receipt_date', value);
    }

    if (e.target.matches('.bank_acc_number')) {
      e.stopImmediatePropagation();
      const { value } = e.target;
      const tx = JSON.parse(localStorage.getItem('sales'));
      tx['bank_acc_number'] = value;
      localStorage.setItem('sales', JSON.stringify(tx));
    }

    if (e.target.matches('.pay_type')) {
      e.stopImmediatePropagation();

      const { value } = e.target;

      if (value === 'Cheque') {
        document.querySelector('.chequenumber').innerHTML = `
        <input type="text" class="bank_acc_number" placeholder="Enter cheque number" />
        `;
        const tx = JSON.parse(localStorage.getItem('sales'));
        tx['bank_acc_number'] = '';
        localStorage.setItem('sales', JSON.stringify(tx));
      } else {
        document.querySelector('.chequenumber').innerHTML = '';
        const tx = JSON.parse(localStorage.getItem('sales'));
        localStorage.setItem('sales', JSON.stringify(tx));
      }

      const tx = JSON.parse(localStorage.getItem('sales'));
      tx['pay_type'] = value;
      localStorage.setItem('sales', JSON.stringify(tx));
    }
  });


  const pro = JSON.parse(localStorage.getItem('sales'));

  const showpayment = pro?.trans_type === 'invoice' ? 'show' : 'hide'
  return `
    <div class="receipt-fields-container  ${privilege}">

   <div class="showpayment ${showpayment}">
    ${paymentUtil()}
  </div>

    </div>
  `;
  
};

export default payment;
