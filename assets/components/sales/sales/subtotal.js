import saveInvoice from './saveInvoice.js';
import checkTax from '../utils/checkTax.js';
import setInputValue from '../utils/setInputValue.js';
import format_number from '../../utils/format_number.js';
import { textInput } from '../../utils/InputFields.js';
import getIndustry from '../../utils/getIndustry.js';
import checkWithholdingtax from '../utils/checkWithholdingtax.js';
import getPrevilleges from '../utils/getPrevilleges.js';
import termnalReceipt from '../utils/termnalReceipt.js';

const subtotal = (vv) => {
  const industry = getIndustry();
  const termnal = termnalReceipt();

  let invoice_desc = '';

  if (industry !== 'roofing company') {
    if (!termnal) {
      invoice_desc = `${textInput({
        type: 'text',
        classname: 'profile trans',
        required: true,
        name: 'profile',
        label: 'Invoice Description',
        value: setInputValue(vv?.profile || ''),
      })}`;
    }
  }

  const { user_id } = JSON.parse(localStorage.getItem('zsdf'));
  const tx = JSON.parse(localStorage.getItem('sales'));

  const trans_type = tx?.trans_type;
  const usid = tx?.user_id;

  // let saveandclearbtns = '';
  // if (trans_type === 'invoice') {
  //   if (user_id === usid && getPrevilleges('salesinvoice')) {
  //     saveandclearbtns = saveInvoice();
  //   }
  // } else {
  //   saveandclearbtns = saveInvoice();
  // }

  return `
  <div>
    ${textInput({
      type: 'text',
      classname: 'sub_total',
      required: true,
      label: 'Sub Total ',
      disabled: 'disabled',
      value: setInputValue(format_number(vv?.sub_total || '')),
    })}
    ${textInput({
      type: 'number',
      classname: 'discount trans',
      required: false,
      label: 'Discount',
      name: 'discount',
      disabled: '',
      value: setInputValue(Number(vv?.discount || '')),
    })}

    <div class="taxbox">
    ${checkTax()}
    ${checkWithholdingtax()}
    </div>

    ${textInput({
      type: 'text',
      classname: 'total',
      required: true,
      label: 'Total',
      disabled: 'disabled',
      value: setInputValue(format_number(vv?.total || '')),
    })}


    ${invoice_desc}

    <div class="save-invoice-btn dbtns">
 

      ${saveInvoice()}

      <a href="#table-top-id" class="cancelinvoice">Reload</span></a>
    
    </div>

  </div>
  
  `;
};
export default subtotal;
