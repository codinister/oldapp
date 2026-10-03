import { classSelector } from '../../utils/Selectors.js';
import Table from '../../utils/Table.js';
import { formatDate } from '../../utils/DateFormats.js';
import deleteAccessControl from '../utils/deleteAccessControl.js';
import getIndustry from '../../utils/getIndustry.js';
import getInvoiceDetails from '../../sales/utils/getInvoiceDetails.js';
import sendInvoiceWhatsapp from '../../sales/utils/customers/sendInvoiceWhatsapp.js';
import inv_num from '../../utils/inv_num.js';

const getProformas = async (proformadatas) => {
  const industry = getIndustry();

  if (proformadatas) {
    let proformadata = proformadatas;
    const arr = JSON.parse(localStorage.getItem('deletedproformas'));
    if (arr) {
      proformadata = proformadatas.filter((v) => !arr.includes(v.tax_id));
    }

    document.addEventListener('click', (e) => {
      if (e.target.matches('.whatsapp-proforma')) {
        sendInvoiceWhatsapp(e);
      }

      if (e.target.matches('.deleteproforma')) {
        e.stopImmediatePropagation();
        const { tax_id } = e.target.dataset;
        if (confirm('Are you sure you want to delete!')) {
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
          fetch(
            `router.php?controller=sales&task=delete_invoice&tax_id=${tax_id}`
          )
            .then((resp) => resp.text())
            .then((data) => {
              if (!localStorage.getItem('deletedproformas')) {
                localStorage.setItem('deletedproformas', JSON.stringify([]));
              }
              const arr = JSON.parse(localStorage.getItem('deletedproformas'));
              const newarr = [...arr, tax_id];
              localStorage.setItem('deletedproformas', JSON.stringify(newarr));
            });
        } else {
        }
      }

      if (e.target.matches('.dup-btn')) {
        e.stopImmediatePropagation();
        const { cust_id, tax_id, user_id } = e.target.dataset;
        const crypto = self?.crypto?.randomUUID
          ? self.crypto.randomUUID()
          : 'UUID not available';

        getInvoiceDetails(cust_id, tax_id, user_id, 'duplicate', (data) => {
          const { products, taxes } = data;
          localStorage.setItem('prozdlist', JSON.stringify(products));

          taxes['uuid'] = crypto;

          localStorage.setItem('sales', JSON.stringify(taxes));
          localStorage.setItem('rend', 3);
          classSelector('noreload').classList.remove('show');
          document.body.style.overflow = 'scroll';
        });
      }

      //VIEW PROFORMA INVOICE
      if (e.target.matches('.viewthisproforma')) {
        e.stopImmediatePropagation();
        const { tax_id } = e.target.dataset;
        window.location = `assets/pdf/invoice.php?inv=${btoa(tax_id)}`;
      }

      if (e.target.matches('.viewthisproduction')) {
        e.stopImmediatePropagation();
        const { tax_id } = e.target.dataset;
        window.location = `assets/pdf/production.php?inv=${btoa(tax_id)}`;
      }

      if (e.target.matches('.editthisproforma')) {
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

    const invoiceHTMLList = (v) => {
      const user = v.firstname + ' ' + v.lastname;
      const profile = v.profile ? v.profile : inv_num(v.tax_id);
      return `
        <tr class="invoice-table">   
        <td>
        <a href="javascript:void(0);" 
        data-tax_id = "${v.tax_id}" 
        class="viewthisproforma">
        ${profile}
        </a>
        </td>

        <td>${formatDate(v.createdAt)}</td>

        <td class="salesicons">

          <table class="actions-btn">
          <tbody>
          <tr>

          <td>
                  <a href="javascript:void(0);">
                  <i class="fa fa-pencil editthisproforma" 
                  data-cust_id = "${v.cust_id}" 
                  data-tax_id = "${v.tax_id}" 
                  data-user_id = "${v.user_id}" 
                  "></i>
                  </a>
        </td>
        <td>
        <a href="javascript:void(0);">
        ${deleteAccessControl(
          `<i class="fa fa-trash deleteproforma"   data-tax_id="${v.tax_id}"></i>`,
          v.user_id
        )}
        </a>
        </td>

        <td>
      <a href="javascript:void(0);" class="dup-btn"
      data-cust_id = "${v.cust_id}" 
      data-tax_id = "${v.tax_id}" 
      data-user_id = "${v.user_id}" 
      >
        DUPLICATE
      </a>
      </td>

      </tr>
      </tbody>
      </table>
      </td>
      </tr>
  `;
    };

    const productionHTMLList = (v) => {
      const user = v.firstname + ' ' + v.lastname;
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

    const productionLists = Object.values(
      proformadata.reduce((a, b) => {
        if (a[b.tax_id]) {
          a[b.tax_id].tax_id = b.tax_id;
        } else {
          a[b.tax_id] = b;
        }
        return a;
      }, {})
    )
      .map((v) => productionHTMLList(v))
      .join('');

    const proformaLists = Object.values(
      proformadata.reduce((a, b) => {
        if (a[b.tax_id]) {
          a[b.tax_id].tax_id = b.tax_id;
        } else {
          a[b.tax_id] = b;
        }
        return a;
      }, {})
    )
      .map((v) => invoiceHTMLList(v))
      .join('');

    let invoicedesc = '';
    if (industry === 'roofing company') {
      invoicedesc = 'Profile';
    } else {
      invoicedesc = 'Invoice desc';
    }

    //production
    classSelector('proformainvoice').innerHTML = `
  ${Table(
    'proforma-inv-table',
    'dd4',
    `<tr class="invoice-table ">   
    <td>${invoicedesc}</td>
    <td>Date</td>
    <td>Action</td>
    </tr>`,
    `${proformaLists}`,
    'proformaTableBodyClass'
  )}
  `;

    const us = JSON.parse(localStorage.getItem('zsdf'));

    const accss = ['111','1']
    if (accss.includes(us?.role_id)) {
      if (classSelector('production')) {
        classSelector('production').innerHTML = `
      ${Table(
        'production-inv-table',
        'dd4',
        `<tr class="invoice-table">   
        <td>${invoicedesc}</td>
        <td>Date</td>
        </tr>`,
        `${productionLists}`,
        'productionTableBodyClass'
      )}
      `;
      }
    }
  }
};

export default getProformas;
