import { classSelector } from '../../utils/Selectors.js';
import Table from '../../utils/Table.js';
import { formatDate } from '../../utils/DateFormats.js';
import deleteAccessControl from '../utils/deleteAccessControl.js';
import getInvoiceDetails from './getInvoiceDetails.js';
import sendInvoiceWhatsapp from '../../sales/utils/customers/sendInvoiceWhatsapp.js';
import roleAccess from '../../utils/roleAccess.js';
import inv_num from '../../utils/inv_num.js';

const getSalesinvoice = async (allinvoicess) => {
  if (allinvoicess) {
    let allinvoices = allinvoicess;
    const arr = JSON.parse(localStorage.getItem('deletedinvoices'));
    if (arr) {
      allinvoices = allinvoicess.filter((v) => !arr.includes(v.tax_id));
    }

    document.addEventListener('click', (e) => {
      if (e.target.matches('.whatsapp-invoice')) {
        sendInvoiceWhatsapp(e);
      }

      if (e.target.matches('.deleteSalesInvoice')) {
        e.stopImmediatePropagation();
        const { tax_id } = e.target.dataset;
        if (confirm('Are you sure you want to delete!')) {
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
          fetch(
            `router.php?controller=sales&task=delete_invoice&tax_id=${tax_id}`
          )
            .then((resp) => resp.text())
            .then((data) => {
              if (!localStorage.getItem('deletedinvoices')) {
                localStorage.setItem('deletedinvoices', JSON.stringify([]));
              }
              const arr = JSON.parse(localStorage.getItem('deletedinvoices'));
              const newarr = [...arr, tax_id];
              localStorage.setItem('deletedinvoices', JSON.stringify(newarr));
            });
        } else {
        }
      }

      if (e.target.matches('.viewthissalesinvoice')) {
        e.stopImmediatePropagation();
        const { cust_id, tax_id, user_id } = e.target.dataset;

        window.location = `assets/pdf/invoice.php?inv=${btoa(tax_id)}`;
      }

      if (e.target.matches('.viewthiswaybillinvoice')) {
        e.stopImmediatePropagation();
        const { cust_id, tax_id, user_id } = e.target.dataset;

        window.location = `assets/pdf/waybill.php?inv=${btoa(tax_id)}`;
      }

      if (e.target.matches('.editthissalesinvoice')) {
        e.stopImmediatePropagation();
        const { cust_id, tax_id, user_id } = e.target.dataset;
        getInvoiceDetails(cust_id, tax_id, user_id, '', (data) => {
          const { products, taxes } = data;
          localStorage.setItem('prozdlist', JSON.stringify(products));
          localStorage.setItem('sales', JSON.stringify(taxes));
          localStorage.setItem('rend', 3);
          classSelector('noreload').classList.remove('show');
          document.body.style.overflow = 'scroll';
        });
      }
    });

    const data = Object.values(
      allinvoices.reduce((a, b) => {
        if (a[b.tax_id]) {
          a[b.tax_id].tax_id = b.tax_id;
        } else {
          a[b.tax_id] = b;
        }
        return a;
      }, {})
    );

    const waybillHTMLList = (v) => {
      const { user_id, role_id } = JSON.parse(localStorage.getItem('zsdf'));

      const role = roleAccess(role_id);

      let hide_if_balance_is_zero = '';
      if (v.balance <= 0) {
        hide_if_balance_is_zero = 'hide';
      }

      let editInvoice = `
      <a href="javascript:void(0);">
      <i class="fa fa-lock" 
      ></i>
      </a>
      `;

      const us = user_id === v.user_id ? true : false;

      if (role || us) {
        editInvoice = `<a href="javascript:void(0);">
        <i class="fa fa-pencil editthissalesinvoice" 
        data-cust_id = "${v.cust_id}" 
        data-tax_id = "${v.tax_id}" 
        data-user_id = "${v.user_id}" 
        ></i>
        </a>`;
      }

      const user = v.firstname + ' ' + v.lastname;
      const profile = v.profile ? v.profile : inv_num(v.tax_id);
      return `
        <tr class="sales-invoice-table">   
        <td>
        <a href="javascript:void(0);" 
        data-cust_id = "${v.cust_id}" 
        data-tax_id = "${v.tax_id}" 
        data-user_id = "${v.user_id}" 
        class="viewthiswaybillinvoice">
        ${profile}
        </a>
        </td>

        <td>${formatDate(v.createdAt)}</td>

  
        </tr>
  `;
    };

    const productionHTMLList = (v) => {
      const profile = v.profile ? v.profile : inv_num(v.tax_id);
      return `
            <tr class="invoice-table">   
            <td>
            <a href="javascript:void(0);" 
            data-tax_id = "${v.tax_id}" 
            class="viewthisproduction">
            ${profile}
            </a>
            </td>
    
            <td>${formatDate(v.createdAt)}</td>
    
          </tr>
      `;
    };

    const invoiceHTMLList = (v) => {
      const { user_id, role_id } = JSON.parse(localStorage.getItem('zsdf'));

      const role = roleAccess(role_id);

      let hide_if_balance_is_zero = '';
      if (v.balance <= 0) {
        hide_if_balance_is_zero = 'hide';
      }

      let editInvoice = `
      <a href="javascript:void(0);">
      <i class="fa fa-lock" 
      ></i>
      </a>
      `;

      const us = user_id === v.user_id ? true : false;

      if (role || us) {
        editInvoice = `<a href="javascript:void(0);">
        <i class="fa fa-pencil editthissalesinvoice" 
        data-cust_id = "${v.cust_id}" 
        data-tax_id = "${v.tax_id}" 
        data-user_id = "${v.user_id}" 
        ></i>
        </a>`;
      }

      const user = v.firstname + ' ' + v.lastname;
      const profile = v.profile ? v.profile : inv_num(v.tax_id);
      return `
        <tr class="sales-invoice-table">   
        <td>
        <a href="javascript:void(0);" 
        data-cust_id = "${v.cust_id}" 
        data-tax_id = "${v.tax_id}" 
        data-user_id = "${v.user_id}" 
        class="viewthissalesinvoice">
        ${profile}
        </a>
        </td>

        <td>${formatDate(v.createdAt)}</td>

        <td class="salesicons">
        <div class="salesiconsinner ${hide_if_balance_is_zero}">

         <table class="actions-btn">
          <tbody>
          <tr>

          <td>

        ${editInvoice}
        </td>
        <td>
        <a href="javascript:void(0);">${deleteAccessControl(
          `<i class="fa fa-trash deleteSalesInvoice" data-tax_id="${v.tax_id}"></i>`,
          v.user_id
        )}
        </a>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
  `;
    };

    const tableBodyList = [...data].map((v) => invoiceHTMLList(v)).join('');

    const us = JSON.parse(localStorage.getItem('zsdf'));

    const waybillBodyList = [...data]
      .map((v) => {
        const accss = ['111','1']
        if (accss.includes(us?.role_id)) {
          return waybillHTMLList(v);
        } else {
          if (Number(v.paymentPercentage) > 75) {
            return waybillHTMLList(v);
          } else {
            return '';
          }
        }
      })
      .filter(Boolean)
      .join('');

    const productionLists = [...data]
      .map((v) => {
        if (us?.role_id !== '111') {
          if (Number(v.paymentPercentage) > 75) {
            return productionHTMLList(v);
          } else {
            return '';
          }
        }
      })
      .filter(Boolean)
      .join('');

    //SALES INVOICE
    classSelector('salesinvoice').innerHTML = `
    ${Table(
      'sales-inv-table',
      'dd2',
      `<tr class="sales-invoice-table">   
      <td>Profile</td>
      <td>Date</td>
      <td>Action</td>
      </tr>`,
      `${tableBodyList}`,
      'invoiceTableBodyClass'
    )}
  `;

    //PRODUCTION
    const accss = ['111','1']
    if (!accss.includes(us?.role_id)) {
      if (classSelector('production')) {
        classSelector('production').innerHTML = `
        ${Table(
          'production-inv-table',
          'dd4',
          `<tr class="invoice-table">   
          <td>Profile</td>
          <td>Date</td>
          </tr>`,
          `${productionLists}`,
          'productionTableBodyClass'
        )}
        `;
      }
    }

    //WAYBILLS
    if (classSelector('waybills')) {
      classSelector('waybills').innerHTML = `
        ${Table(
          'waybill-inv-table',
          'dd2',
          `<tr class="sales-invoice-table">   
          <td>Profile</td>
          <td>Date</td>
          </tr>`,
          `${waybillBodyList}`,
          'invoiceTableBodyClass'
        )}
        `;
    }
  }
};

export default getSalesinvoice;
