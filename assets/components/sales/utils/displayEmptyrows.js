import format_number from '../../utils/format_number.js';
import editInvoiceAcessControl from '../utils/editInvoiceAccessControl.js';

const displayEmptyrows = () => {
  const obj = JSON.parse(localStorage.getItem('prozdlist'));

  if (obj) {
    let numbering = 1;

    const output = Object.values(obj)
      .map((v, k) => {
        if (v?.qty) {
          const duration = Number(v.duration) ? Number(v.duration) : 1;
          const total_amnt =
            Number(v.qty) * Number(duration) * Number(v.prod_price);

          obj[k].total = total_amnt;

          return `
            <tr class="sales-table">
            <td class="hideonmobile">${numbering++}</td>
            <td>
            <input type="text" name="qty" data-key="${k}" value="${
            v.qty
          }" class="qty sumitems" />
            </td>
            <td>
            <input type="text" name="prod_name" data-key="${k}" value="${
            v.prod_name
          }" class="prod_name  schprod" />
            </td>
            <td>
            <input class="sumitems duration" name="duration" type="text" data-key="${k}" value="${
            v.duration
          }" />
            </td>
            <td>
            <input class="sumitems prod_price" name="prod_price" type="text" data-key="${k}" value="${
            v.prod_price
          }" />
            </td>
            <td>
            <span class="total${k}">
            ${format_number(total_amnt)}
            </span>
            </td>
            <td>
            <span>
            ${editInvoiceAcessControl(
              `<i class="fa fa-trash delete-item" data-s_id="${v.s_id}" data-trash="${k}"></i>`
            )}
            </span>
            </td>
            </ul>
          `;
        }
      })
      .join('');

    localStorage.setItem('prozdlist', JSON.stringify(obj));

    return output;
  } else {
    return '';
  }
};

export default displayEmptyrows;
