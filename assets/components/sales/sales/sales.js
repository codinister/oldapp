import calculateTransactions from '../utils/calculateTransactions.js';
import transactionInputs from './transactionInputs.js';
import salesLocalstorage from '../../data/clientside/localstorage/default/defaultSalesLocalstorage.js';
import salesTopbar from './salesTopbar.js';
import { classSelector } from '../../utils/Selectors.js';
import Table from '../../utils/Table.js';
import setSubtotalValue from '../utils/setSubtotalValue.js';
import displayProductList from '../utils/displayProductList.js';
import format_number from '../../utils/format_number.js';
import clearSales from '../utils/clearSales.js';
import getIndustry from '../../utils/getIndustry.js';
import sendEmail from '../../utils/sendEmail.js';
import Spinner from '../../utils/Spinner.js';
import { ymd } from '../../utils/DateFormats.js';
import durationConverter from '../../utils/durationConverter.js';
import getPrevilleges from '../utils/getPrevilleges.js';
import posTableclasses from '../../utils/posTableclasses.js';
import dataListMobile from '../../utils/dataListMobile.js';
import paymentUtil from './paymentUtil.js';

const sales = (customersdata, receipts, proforma, invoice) => {
  const industry = getIndustry();
  const taxx = JSON.parse(localStorage.getItem('sales'));
  const sett = JSON.parse(localStorage.getItem('sinpt'));

  const tx = JSON.parse(localStorage.getItem('sales'));

  const sumItems = (e) => {
    const obj = JSON.parse(localStorage.getItem('prozdlist'));

    const { key } = e.target.dataset;
    const { name, value } = e.target;

    if (obj) {
      if (name === 'qty') {
        obj[key].qty = value;
      }

      if (name === 'duration') {
        obj[key].duration = value;
        if (industry === 'rentals' || industry === 'service provider') {
          const start_date = classSelector('invoice_date').value;
          // const expiry_date = ymd(durationConverter(start_date, value));
          // obj[key].exp_date = expiry_date;
        }
      }

      if (name === 'prod_price') {
        obj[key].prod_price = value;
      }

      if (name === 'prod_name') {
        obj[key].prod_name = value;
      }

      localStorage.setItem('prozdlist', JSON.stringify(obj));

      //EDITING MODE
      const nt = JSON.parse(localStorage.getItem('prozdlist'));
      const newItem = nt[key];
      const quantity = newItem?.qty > 0 ? Number(newItem?.qty) : 1;
      const length = newItem?.duration > 0 ? Number(newItem?.duration) : 1;

      const unit_price =
        newItem?.prod_price > 0 ? Number(newItem?.prod_price) : 1;

      const total = Number(quantity) * Number(length) * Number(unit_price);

      nt[key].total = total;

      localStorage.setItem('prozdlist', JSON.stringify(nt));

      classSelector(`total${key}`).textContent = format_number(total);

      classSelector(`total${key}`).value = Number(total);
      setSubtotalValue(classSelector, format_number);
      calculateTransactions(e);
    }
  };

  document.addEventListener('click', (e) => {
    //SEND BY EMAIL
    if (e.target.matches('.soemail')) {
      Spinner('whatsappspin');

      const sendEmails = async () => {
        const { cust_id, user_id, tax_id, pay_id, title } = e.target.dataset;

        let url;
        let fetchURL;
        const origin = window.location.origin;
        let subject;
        if (pay_id) {
          url = `${origin}/api/pdf/receipt${tax_id}.pdf`;
          fetchURL = `api/receipt.php?c=${cust_id}&u=${user_id}&t=${tax_id}&p=${pay_id}`;
          subject = 'Payment Receipt';
        } else {
          url = `${origin}/api/pdf/invoice${tax_id}.pdf`;
          fetchURL = `api/invoice.php?c=${cust_id}&u=${user_id}&t=${tax_id}`;
          subject = 'Invoice';
        }

        const messg = classSelector('messg').value;
        const email = classSelector('typ').value;

        const messUrl = `${messg} \n\n ${url}`;
        const message = messUrl;

        const createdPdf = await fetch(fetchURL);
        const resp = createdPdf.text();

        sendEmail(
          email,
          subject,
          message,
          'router.php?controller=widget&task=send_pdf_email'
        );

        classSelector('modalboxfour').classList.remove('show');
        document.body.style.overflow = 'scroll';
        classSelector('whatsappspin').innerHTML = '';
      };

      sendEmails();
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('.setsalesinvoice')) {
      const taxx = JSON.parse(localStorage.getItem('sales'));
      if (e.target.checked) {
        taxx['trans_type'] = 'invoice';
        taxx['newpayment'] = 0;

        if(classSelector('payment')){
          classSelector('payment').value = null;
          calculateTransactions(e);
        }


        classSelector('invoicestatus').innerHTML = 'SALES INVOICE';
     
        classSelector('receipt-fields-container').innerHTML =  paymentUtil()
      } else {
        taxx['trans_type'] = 'proforma';
        classSelector('invoicestatus').innerHTML = 'PROFORMA INVOICE';
        classSelector('receipt-fields-container').innerHTML =  ''
      }
      localStorage.setItem('sales', JSON.stringify(taxx));
    }

    if (e.target.matches('.enablebankdetails')) {
      const taxx = JSON.parse(localStorage.getItem('sales'));
      if (e.target.checked) {
        taxx['addbank'] = 1;
      } else {
        taxx['addbank'] = 0;
      }
      localStorage.setItem('sales', JSON.stringify(taxx));
    }

    if (e.target.matches('.sumitems')) {
      e.stopImmediatePropagation();
      sumItems(e);
    }

    if (e.target.matches('.tax-inpt')) {
      e.stopImmediatePropagation();
      const taxObj = JSON.parse(localStorage.getItem('sales'));

      if (e.target.checked) {
        taxObj['taxchecked'] = true;
        localStorage.setItem('sales', JSON.stringify(taxObj));
        calculateTransactions(e);
      } else {
        taxObj['taxchecked'] = false;
        localStorage.setItem('sales', JSON.stringify(taxObj));
        calculateTransactions(e);
      }
    }

    if (e.target.matches('.with-tax-inpt')) {
      e.stopImmediatePropagation();
      const taxObj = JSON.parse(localStorage.getItem('sales'));
      if (e.target.checked) {
        taxObj['withholdingchecked'] = true;
        localStorage.setItem('sales', JSON.stringify(taxObj));
        calculateTransactions(e);
      } else {
        taxObj['withholdingchecked'] = false;
        localStorage.setItem('sales', JSON.stringify(taxObj));
        calculateTransactions(e);
      }
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.trans')) {
      e.stopImmediatePropagation();
      calculateTransactions(e);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.sumitems')) {
      e.stopImmediatePropagation();
      sumItems(e);
    }
  });

  const privilege = getPrevilleges('salesinvoice')
    ? 'paymentdiplay show'
    : 'paymentdiplay hide';

  const salesSummaryBar = () => {
    document.addEventListener('click', (e) => {
      salesLocalstorage();
      const txx = JSON.parse(localStorage.getItem('sales'));

      if (e.target.matches('.userlink')) {
        if (localStorage.getItem('sales')) {
          const { user_id } = e.target.dataset;
          const obj = JSON.parse(localStorage.getItem('sales'));
          obj['prepared_by'] = obj?.user_id;
          obj['user_id'] = user_id;
          localStorage.setItem('sales', JSON.stringify(obj));
        }
      }

      if (e.target.matches('.customerlink')) {
        e.stopImmediatePropagation();
        const { id, name, phone, location, email } = e.target.dataset;

        if (txx) {
          txx['cust_id'] = id;
          txx['cust_name'] = name;
          txx['cust_phone'] = phone;
          txx['cust_email'] = email;
          localStorage.setItem('sales', JSON.stringify(txx));
        }
      }

      if (e.target.matches('.cancelinvoice')) {
        e.stopImmediatePropagation();
        clearSales();
      }

      if (e.target.matches('.clearal')) {
        e.stopImmediatePropagation();
        clearSales();
      }

      if (e.target.matches('.delete-item')) {
        e.stopImmediatePropagation();

        if (confirm('Are you sure you want to delete!')) {
          const { trash, s_id } = e.target.dataset;

          const obj = JSON.parse(localStorage.getItem('prozdlist'));

          if (obj[trash]?.s_id.length > 0) {
            const sid = obj[trash].s_id;

            obj[trash] = {
              duration: ' ',
              prod_id: ' ',
              prod_name: ' ',
              prod_price: ' ',
              prodsize: ' ',
              qty: ' ',
              s_id: sid,
              total: ' ',
            };
          } else [delete obj[trash]];

          localStorage.setItem('prozdlist', JSON.stringify(obj));

          classSelector('pos-sales-output').innerHTML = displayProductList();

          setSubtotalValue();

          calculateTransactions(e, (data) => {});
        } else {
        }
      }
    });

    const vv = JSON.parse(localStorage.getItem('sales'));

    return transactionInputs(vv, privilege);
  };

  const showbtn = getPrevilleges('addrowsbutton') ? ' show' : 'hide';

  const { table_class, length_duration } = posTableclasses();

  if (taxx) {
    if (taxx?.trans_type === 'invoice') {
      setTimeout(() => {
        classSelector('invoicestatus').innerHTML = 'SALES INVOICE';
      }, 0);
    } else {
      taxx['trans_type'] = 'proforma';
      localStorage.setItem('sales', JSON.stringify(taxx));
    }
  }

  if (taxx) {
    if (!taxx?.trans_type) {
      taxx['trans_type'] = 'proforma';
      localStorage.setItem('sales', JSON.stringify(taxx));
    }
  }

  let checkinvoice = '';
  if (taxx?.trans_type === 'invoice') {
    checkinvoice = 'checked';
  }

  let displaysalesinchkbx = '';
  let enablebankdetails = '';

  const showinvcheckbx = taxx?.tax_id > 0 && taxx?.trans_type === 'proforma' ? 'hide' : 'show'




    displaysalesinchkbx = `
    <div class="showinvcheckbx ${showinvcheckbx}">
    <input type="checkbox" ${checkinvoice} class="setsalesinvoice" /> CREATE SALES INVOICE </div>`;

  if (industry !== 'retails') {
    enablebankdetails = `
    <input type="checkbox"  class="enablebankdetails" /> INCLUDE BANK DETAILS`;
  }

  setTimeout(() => {
    const sales = JSON.parse(localStorage.getItem('sales'));

    if (sales?.addbank > 0) {
      classSelector('enablebankdetails').checked = true;
    }
    if (sales?.taxchecked) {
      classSelector('tax-inpt').checked = true;
    }

    if (sales?.pay_type === 'Cheque') {
      classSelector('pay_type').value = 'Cheque';

      const data =
        sales?.bank_acc_number.length > 0 ? sales?.bank_acc_number : '';
      document.querySelector('.chequenumber').innerHTML = `
      <input type="text" class="bank_acc_number" value="${data}"  placeholder="Enter cheque number" />
      `;
    }
  }, 1000);

  //estimator
  return `
        ${salesTopbar(customersdata, receipts, proforma, invoice)}

        
        
   <div class="hideondesktop mobile-products-wrapper">

   ${dataListMobile()}

   </div>
        
        ${Table(
          table_class,
          'table-top-id',
          `<tr>
            <td class="hideonmobile">#</td>
            <td>Qty</td>
            <td>Description</td>
            ${length_duration}
            <td><span class="hideonmobile">Unit</span>Price</td>
            <td>Total</td>
            <td></td>
            </tr>
            `,
            displayProductList(),
          'pos-sales-output'
        )}


        <div class="${privilege} mobile-sinv">
        
        <h5 class="invoicestatus">PROFORMA INVOICE</h5>

        <div class="checkbxdiv">
            <div>${displaysalesinchkbx}</div>    
            <div>${sett?.bank_acc ? enablebankdetails : ''}</div>
        </div>
                          
          <br />
        </div>

        ${salesSummaryBar()}
        `;
};

export default sales;
