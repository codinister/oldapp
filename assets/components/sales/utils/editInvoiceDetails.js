import format_number from '../../utils/format_number.js';
import { classSelector } from '../../utils/Selectors.js';
import editInvoiceAcessControl from './editInvoiceAccessControl.js';
import { unitprice, invoicedesc } from '../utils/activateInvoiceinputs.js';

const editInvoiceDetails = (data, trans_type = '') => {
  const { products, sales } = data;

  if (trans_type === 'proforma') {
    sales['trans_type'] = 'proforma';
  } else {
    sales['trans_type'] = 'invoice';
  }

  let numbering = 1;

  const productsListItems = (v, k) => {
    if (v?.prod_id) {
      const total_length = Number(v.prod_size) ? Number(v.prod_size) : 1;
      const total_amnt =
        Number(v.qty) * Number(total_length) * Number(v.prod_price);

      products[k].total = total_amnt;

      return `
          <tr class="sales-table">
          <td>${numbering++}</td>
          <td>
          <input type="text" name="qty" data-key="${k}" value="${
        v.qty
      }" class="qty sumitems" />
          </td>
          <td>

          <input type="text" name="prod_name" data-key="${k}" 
          value="${v.prod_name}" ${invoicedesc} class="prod_name schprod " />
          
          </td>
          <td>
          <input class="sumitems" name="prod_size" type="text" data-key="${k}" value="${
        v.prod_size
      }" class="prod_size" />
          </td>
          <td>
          <input class="sumitems" name="prod_price" type="text" data-key="${k}" 
          value="${v.prod_price}" ${unitprice} class="prod_price" />
          </td>
          <td>
          <span class="total${k}">
          ${format_number(total_amnt)}
          </span>
          </td>
          <td>
          ${editInvoiceAcessControl(
            `<i class="fa fa-trash delete-item" data-s_id="${v.s_id}"  data-trash="${k}"></i>`
          )}
          </td>
          </tr>
        `;
    }
  };

  const prods = products.map((v, k) => productsListItems(v, k)).join('');

  const subtotal =
    Number(sales?.transportation) +
    Number(sales?.installation) +
    Number(sales?.sub_total);

  const discount = Number(subtotal) - Number(sales?.discount);
  const withholdtax = Number(discount) - Number(sales?.withholdingtax);
  const checktax = sales?.total > withholdtax ? true : false;

  const subt = Number(sales?.total) - Number(sales?.withholdingtax);

  const withholdchecked = sales?.total > subt;

  if (classSelector('pos-sales-output')) {
    classSelector('pos-sales-output').innerHTML = prods;

    if (!sales?.pay_type) {
      sales['pay_type'] = 'Cash';
    }

    if (classSelector('balance')) {
      classSelector('balance').value = sales?.balance;
    }
    //classSelector('payment').value = sales?.payment;
    classSelector('total').value = sales?.total;

    if (classSelector('top_total')) {
      classSelector('top_total').textContent = sales?.total;
    }

    if (classSelector('tax-inpt')) {
      classSelector('tax-inpt').checked = checktax;
    }

    if (classSelector('with-tax-inpt')) {
      classSelector('with-tax-inpt').checked = withholdchecked;
      sales['withholdingchecked'] = withholdchecked;
    }

    if (classSelector('estimatorinptclass')) {
      classSelector('estimatorinptclass').value = sales?.est_name;
    }

    classSelector('customerinptclass').value = sales?.cust_name;
    classSelector('customerhiddeninpt').value = sales?.cust_id;
    classSelector('sub_total').value = sales?.sub_total;
    classSelector('discount').value = sales?.discount;
    classSelector('pay_type').value = sales?.pay_type || 'Cash';
    classSelector('profile').value = sales?.profile;

    if (classSelector('location')) {
      classSelector('location').value = sales?.location;
    }

    if (classSelector('transportation')) {
      classSelector('transportation').value = sales?.transportation;
    }

    if (classSelector('installation')) {
      classSelector('installation').value = sales?.installation;
    }

    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('prozdlist', JSON.stringify(products));
  }
};

export default editInvoiceDetails;
