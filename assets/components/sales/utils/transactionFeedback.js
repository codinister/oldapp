import { classSelector } from '../../utils/Selectors.js';
import displayToast from '../../utils/displayToast.js';
import Contract from '../sales/Contract.js';
import sendInvoiceWhatsapp from '../utils/customers/sendInvoiceWhatsapp.js';
import sendReceiptWhatsapp from '../utils/customers/sendReceiptWhatsapp.js';

const transactionfeedback = (
  cust_id,
  tax_id,
  user_id,
  pay_id,
  cust_name,
  cust_phone
) => {



  document.addEventListener('change', (e) => {
    if (e.target.matches('.invoicenote')) {
      e.stopImmediatePropagation();
      const tx = JSON.parse(localStorage.getItem('sales'));
      tx['note'] = e.target.value;
      localStorage.setItem('sales', JSON.stringify(tx));
    }

    if (e.target.matches('.addcontract')) {
      if (e.target.checked) {
        const tx = JSON.parse(localStorage.getItem('sales'));

        classSelector('note-box').innerHTML = Contract(
          tx?.cust_name,
          tx?.tax_id,
          tx?.cust_id,
          tx?.total
        );
      } else {
        classSelector('note-box').innerHTML = '';
      }
    }

    if (e.target.matches('.addnote')) {
      if (e.target.checked) {
        document.querySelector('.note-box').innerHTML = `
          <div class="addnote">
          <textarea class="invoicenote"></textarea>
          <label>Add note</label>
          <a href="javascript:void(0);" class="addinvnote">ADD NOTE</a>
          </div>
          `;
      } else {
        document.querySelector('.note-box').innerHTML = '';
      }

      setTimeout(() => {
        if (classSelector('invoicenote')) {
          const tx = JSON.parse(localStorage.getItem('sales'));
          classSelector('invoicenote').innerHTML = tx?.note;
        }
      }, 1000);
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.closebx')) {
      localStorage.removeItem('prozdlist');
      localStorage.removeItem('sales');
      localStorage.setItem('rend', 3);
    }

    if (e.target.matches('.previewpdf')) {
      e.stopImmediatePropagation();
      const { tax_id, pay_id } = e.target.dataset;

      if (pay_id?.length > 0) {
        localStorage.removeItem('contract');
        localStorage.removeItem('sales');
        localStorage.removeItem('prozdlist');
        const url = 'assets/pdf/receipt.php?rec=' + btoa(pay_id);
        window.location = url;
      } else {
        localStorage.removeItem('contract');
        localStorage.removeItem('sales');
        localStorage.removeItem('prozdlist');
        const url = 'assets/pdf/invoice.php?inv=' + btoa(tax_id);
        window.location = url;
      }
    }

    if (e.target.matches('.whatsapp')) {
      e.stopImmediatePropagation();
      if (e.target.dataset.pay_id?.length > 0) {
        sendReceiptWhatsapp(e);
      } else {
        sendInvoiceWhatsapp(e);
      }
    }

    if (e.target.matches('.addinvnote')) {
      e.stopImmediatePropagation();

      const tx = JSON.parse(localStorage.getItem('sales'));
      const fd = new FormData();
      fd.append('note', tx?.note);
      fd.append('tax_id', tx?.tax_id);

      fetch('router.php?controller=sales&task=addInvoiceNote', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            displayToast('bgdanger', data);
          } else {
            displayToast('lightgreen', data);
            document.querySelector('.note-box').innerHTML = '';

            classSelector('addnote').checked = false;
          }
        });
    }
  });











  const enableContract = () => {
    const { role_id } = JSON.parse(localStorage.getItem('zsdf'));
    const { comp_name } = JSON.parse(localStorage.getItem('sinpt'));

    if (comp_name.toLowerCase() == 's.p agency') {
      if (role_id == 1 || role_id == 111 || role_id == 5) {
        return `<div>
      <input type="checkbox"  class="addcontract" /> 
      <label>Add contract </label> 
      </div>`;
      }
    }
    return '';
  };

  let addnoteinput = '';

  const set = JSON.parse(localStorage.getItem('sinpt'));

  if (set?.receipt_type !== 'THERMNAL') {
    addnoteinput = `
  <div>
  <input type="checkbox"  class="addnote" /> 
  <label>Add note </label> 
  </div>`;
  }

  return `
  <duv class="feedbackwrapper">
      <div class="feedbackbtns">
          <a href="javascript:void(0);"
          class="previewpdf"
          data-cust_id = "${cust_id}" 
          data-tax_id = "${tax_id}" 
          data-user_id = "${user_id}" 
          data-pay_id = "${pay_id}" 
          >${pay_id ? 'VIEW RECEIPT' : 'VIEW INVOICE'}</a>
          ${
            cust_phone
              ? `
          <a href="javascript:void(0);" class="whatsappbx">
          <img 
          data-cust_id = "${cust_id}" 
          data-tax_id = "${tax_id}" 
          data-user_id = "${user_id}" 
          data-pay_id = "${pay_id}" 
          data-cust_name = "${cust_name}"
          data-phone = "${cust_phone}"
          class="whatsapp" src="assets/images/whatsapp.jpg" alt="whatsapp" />
          </a>`
              : ''
          }
          <a href="javascript:void(0);" class="closebx">Reload</a>
      </div>
      <div class="checkboxex-wrapper">
        ${enableContract()}
        ${addnoteinput}
      </div

      <div></div>
      <div class="note-box"></div>


  </div>
  `;
};

export default transactionfeedback;
