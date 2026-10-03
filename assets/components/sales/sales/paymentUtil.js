import { textInput } from '../../utils/InputFields.js';
import setInputValue from '../utils/setInputValue.js';
import format_number from '../../utils/format_number.js';
import { classSelector } from '../../utils/Selectors.js';

const paymentUtil = () => {
  const v = JSON.parse(localStorage.getItem('sales'));

  setTimeout(() => {
    if (classSelector('receipt_date')) {
      classSelector('receipt_date').valueAsDate = new Date();
    }
  }, 1000);

  const disabled = v?.balance < 1 && v?.trans_type === 'invoice' ? 'disabled' : '';
const paytypedisabled = v?.tax_id > 0 && v.balance < 1 ? 'disabled' : '';
  const newpay =
    v?.newpayment > 0 ? setInputValue(v?.newpayment) : 0;


 

  return `
  
    ${textInput({
      type: 'date',
      classname: 'receipt_date',
      required: true,
      disabled,
      label: 'Receipt date',
    })}


      ${textInput({
        type: 'number',
        classname: 'payment trans',
        required: true,
        name: 'payment',
        label: 'Make Payment',
        disabled,
        value: newpay,
      })}


      ${textInput({
        type: 'text',
        classname: 'balance',
        required: true,
        label: 'Balance',
        disabled: 'disabled',
        value: setInputValue(format_number(v?.balance || '')),
      })}

      <div class="select-inpt">
      <label>Payment Type</label>
      <br>
        <select class="pay_type"  ${paytypedisabled}  >
        <option>Cash</option>
        <option>Cheque</option>
        <option>Bank Transfer</option>
        <option>Mobile Money</option>
        </select>
        <div class="chequenumber"></div>
      </div>
  
  `;
};

export default paymentUtil;
