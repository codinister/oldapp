import displayToast from '../../utils/displayToast.js';
import Spinner from '../../utils/Spinner.js';
import { classSelector } from '../../utils/Selectors.js';
import transactionfeedback from '../utils/transactionFeedback.js';
import Buttons from '../../utils/Buttons.js';
import getIndustry from '../../utils/getIndustry.js';
import itemsValidation from '../utils/itemsValidation.js';
import paymentValidation from '../utils/paymentValidation.js';
import bankAccValidation from '../utils/bankAccValidation.js';
import termnalReceipt from '../utils/termnalReceipt.js';
import sendReceiptSms from '../../utils/v2/sendReceiptSms.js';
import format_number from '../../utils/format_number.js';

const saveInvoice = () => {
  const industry = getIndustry();
  const termnal = termnalReceipt();

  document.addEventListener('click', async (e) => {
    if (e.target.matches('.saveinvoice')) {
      e.stopImmediatePropagation();

      //Get all the necessary invoice information
      const items = itemsValidation();
      const sales = bankAccValidation();
      const payment = paymentValidation();

      const duration = items.reduce(
        (a, b) => Number(a) + Number(b.duration),
        0,
      );

      if (['rentals', 'service provider'].includes(industry)) {
        if (duration > 0 && sales?.exp_date.length < 1) {
          return displayToast('bgdanger', 'End date required!');
        }
      }

      //No item validation
      if (sales?.length < 1) {
        return displayToast('bgdanger', 'Add an item to continue!');
      }

      const unitppricelength = Object.values(items)
        .map((v) => v.unit_price)
        .filter(Boolean).length;

      //Unit price checker
      if (unitppricelength < 1) {
        return displayToast('bgdanger', 'Unit price field required!');
      }

      //Customer field validation
      if (sales?.cust_id < 1) {
        return displayToast('bgdanger', "Customer's field required!");
      }

      if (!termnal) {
        if (sales?.balance < 0) {
          return displayToast('bgdanger', 'Payment exceeded!');
        }
      }

      //Invoice description validation
      if (!termnal) {
        if (sales?.profile.length < 1) {
          return displayToast('bgdanger', 'Invoice description required!');
        }
      }

      //Invoice date validation
      if (sales?.invoice_date.length < 1) {
        return displayToast('bgdanger', 'Invoice date required!');
      }

      const fd = new FormData();
      fd.append('sales', JSON.stringify(sales));
      fd.append('items', JSON.stringify(items));
      fd.append('payment', JSON.stringify(payment));

      classSelector('saveinvoice-wrapper').innerHTML =
        Spinner('saveinvoicespin');

      const salesFetch = await fetch(
        'router.php?controller=sales&task=save_sales',
        {
          method: 'Post',
          body: fd,
        },
      );
      const data = await salesFetch.text();

      if (data.indexOf('errors') != -1) {
        displayToast('bgdanger', data);
        classSelector('saveinvoice-wrapper').innerHTML = Buttons([
          {
            btnclass: 'saveinvoice',
            btnname: 'SAVE INVOICE',
          },
        ]);
      } else {
        e.target.style.display = 'none';

        const v = data.split('-');

        const tx = JSON.parse(localStorage.getItem('sales'));
        tx['pay_id'] = v[2] || '';
        tx['tax_id'] = v[3] || '';
        localStorage.setItem('sales', JSON.stringify(tx));

        const {
          cust_id,
          tax_id,
          user_id,
          pay_id,
          cust_name,
          cust_phone,
          newpayment,
          balance,
          profile,
        } = JSON.parse(localStorage.getItem('sales'));

        classSelector('pos-sales').innerHTML = transactionfeedback(
          cust_id,
          tax_id,
          user_id,
          pay_id,
          cust_name,
          cust_phone,
        );
        window.scrollTo(0, 0);

        if (classSelector('saveinvoicespin')) {
          classSelector('saveinvoicespin').innerHTML = '';
        }

        const message = `GHS ${format_number(newpayment)} paid by ${cust_name}`;


        try { 
          await sendReceiptSms(cust_phone, message, newpayment);
        } catch (err) {
          if (err instanceof Error) {
            console.log('SMS Error:', err.message);
          }
        }
      }
    }
  });

  return `
  <div class="saveinvoice-wrapper">

  ${Buttons([
    {
      btnclass: 'saveinvoice',
      btnname: 'SAVE INVOICE',
    },
  ])}
  </div>
  `;
};

export default saveInvoice;
